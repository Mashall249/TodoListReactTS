import axios from 'axios';
import { authStorage } from '../utils/storage';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080', // SpringBoot
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

// リクエスト共通処理: トークンの自動付与
api.interceptors.request.use(
	(config) => {
		const token = authStorage.getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// レスポンス共通処理 → 401は強制ログアウト
api.interceptors.response.use(
	(response) => response,
	(error) => {
		//401 Unauthorized（シンプルにログイン画面に飛ばす）
		if (error.response.status === 401) {
			authStorage.clear();
			window.location.href = '/user/login';
		}

		return Promise.reject(error);
	}
);

export default api;
