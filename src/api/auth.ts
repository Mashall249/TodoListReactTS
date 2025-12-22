import type {
	ChangePasswordType,
	EditType,
	LoginRequestType,
	LoginResponseType,
	RegisterRequestType,
	UserEntityType,
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

	getProfile: async () => {
		const res = await api.get<UserEntityType>('/user/profile');
		return res.data;
	},

	register: async (data: RegisterRequestType) => {
		await api.post('/user/register', data);
	},

	updateProfile: async (data: EditType) => {
		const res = await api.put<UserEntityType>('/user/profile', data);
		return res.data;
	},

	changePassword: async (data: ChangePasswordType) => {
		await api.put('/user/password', data);
	},

	deleteAccount: async () => {
		await api.delete('/user/profile');
	},
};
