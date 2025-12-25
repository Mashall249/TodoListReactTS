/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { authStorage } from '../utils/storage';

// axiosインスタンス
const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080', // SpringBoot
	withCredentials: true, // Cookie
	headers: {
		'Content-Type': 'application/json',
	},
});

// リクエスト共通処理: トークンの自動付与
api.interceptors.request.use(
	(config) => {
		const token = authStorage.getToken();
		if (token && !config.url?.includes('/user/refresh')) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// 複数リクエストの同時失敗を制御するための変数
let isRefreshing = false;
let failedQueue: any[] = [];

// 待機していたリクエストを再開させる関数
const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

// レスポンス共通処理 → 401は強制ログアウト
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (originalRequest.url.includes('/user/refresh')) {
			authStorage.clear();
			window.location.href = '/user/login';
			return Promise.reject(error);
		}

		// 401エラー かつ 未リトライの場合
		if (error.response?.status === 401 && !originalRequest._retry) {
			// 既にリフレッシュ処理が走っている場合（同時リクエスト対策）
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({
						resolve: (token: string) => {
							originalRequest.headers.Authorization = `Bearer ${token}`;
							resolve(api(originalRequest));
						},
						reject: (err: any) => {
							reject(err);
						},
					});
				});
			}

			// ここからリフレッシュ処理開始
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				// 新しいトークンを取得
				const response = await api.post('/user/refresh');
				const newAccessToken = response.data; // SpringBootが文字列で返している場合

				// トークン保存
				authStorage.setToken(newAccessToken);

				// axiosのデフォルトヘッダー更新
				api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

				// 待機させていた他のリクエストを再開
				processQueue(null, newAccessToken);

				// 自身のリクエストを再開
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				// リフレッシュ失敗時
				processQueue(refreshError, null);
				authStorage.clear();
				window.location.href = '/user/login';
				return Promise.reject(refreshError);
			} finally {
				// 処理終了フラグ
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default api;
