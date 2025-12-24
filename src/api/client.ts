import axios from 'axios';
import { authStorage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
		const { logout } = useAuth();
		const navigate = useNavigate();

		//401 Unauthorized（シンプルにログイン画面に飛ばす）
		if (error.response.status === 401) {
			logout();
			navigate('/user/login', { replace: true });
		}

		return Promise.reject(error);
	}
);

export default api;
