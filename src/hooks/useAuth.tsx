import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { ChangePasswordType, EditType } from '../types/User';
import { authApi } from '../api/auth';

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}

	const { username, isAuthenticated, login, logout, updateUsername } = context;

	const updateProfile = async (data: EditType) => {
		const res = await authApi.updateProfile(data);

		if (res.username && res.username !== username) {
			updateUsername(res.username);
		}
	};

	const changePassword = async (data: ChangePasswordType) => {
		await authApi.changePassword(data);
	};

	const deleteAccount = async () => {
		if (!username) return;
		await authApi.deleteAccount(username);
		await logout();
	};

	return {
		username,
		isAuthenticated,
		login,
		logout,
		updateProfile,
		changePassword,
		deleteAccount,
	};
};
