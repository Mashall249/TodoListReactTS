import { createContext, useEffect, useState, type ReactNode } from 'react';
import { authStorage } from '../utils/storage';
import { authApi } from '../api/auth';

type AuthContextType = {
	username: string | null;
	isAuthenticated: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	updateUsername: (newUsername: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [username, setUsername] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false); // 初期化完了フラグ

	useEffect(() => {
		const token = authStorage.getToken();
		const storedUser = authStorage.getUsername();

		if (token && storedUser) {
			setUsername(storedUser);
			setIsAuthenticated(true);
		}
		setIsInitialized(true);
	}, []);

	// ログイン
	const login = async (name: string, pass: string) => {
		const data = await authApi.login({ username: name, password: pass });

		authStorage.setToken(data.accessToken);
		authStorage.setUsername(data.username);

		setUsername(data.username);
		setIsAuthenticated(true);
	};

	// ログアウト
	const logout = async () => {
		try {
			await authApi.logout();
		} catch (error) {
			console.error('Logout API failed', error);
		} finally {
			authStorage.clear();
			setUsername(null);
			setIsAuthenticated(false);
		}
	};

	const updateUsername = (newUsername: string) => {
		authStorage.setUsername(newUsername);
		setUsername(newUsername);
	};

	// 初期化が終わるまで何も表示しない
	if (!isInitialized) {
		return null;
	}

	return (
		<AuthContext.Provider
			value={{
				username,
				isAuthenticated,
				login,
				logout,
				updateUsername,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
