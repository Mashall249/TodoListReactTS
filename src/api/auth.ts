import type {
	ChangePasswordType,
	EditType,
	LoginRequestType,
	LoginResponseType,
	RegisterRequestType,
} from '../types/User';
import api from './client';

// 通信用
export const authApi = {
	login: async (data: LoginRequestType) => {
		const res = await api.post<LoginResponseType>('/user/login', data);

		return res.data;
	},

	logout: async () => {
		await api.post('/user/logout');
	},

	register: async (data: RegisterRequestType) => {
		await api.post('/user/register', data);
	},

	updateProfile: async (data: EditType) => {
		const res = await api.put<{ username: string }>(`/user/${data.username}`, data);
		return res.data;
	},

	changePassword: async (data: ChangePasswordType) => {
		await api.put(`/user/${data.username}/password`, data);
	},

	deleteAccount: async (username: string) => {
		await api.delete(`/user/${username}`);
	},
};
