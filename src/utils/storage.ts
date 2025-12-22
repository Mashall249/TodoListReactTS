const TOKEN_KEY = 'accessToken';
const USERNAME_KEY = 'username';

export const authStorage = {
	// トークン管理
	getToken: () => localStorage.getItem(TOKEN_KEY),
	setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),

	// ユーザー名管理
	getUsername: () => localStorage.getItem(USERNAME_KEY),
	setUsername: (username: string) => localStorage.setItem(USERNAME_KEY, username),

	// ログイン状態確認
	isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),

	// 全クリア（ログアウト時）
	clear: () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USERNAME_KEY);
	},
};
