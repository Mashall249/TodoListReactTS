import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';

export const RootLayout = () => {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/user/login');
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			{/* ヘッダーバー */}
			<AppBar position="static">
				<Toolbar>
					{/* タイトル (クリックでホームへ) */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
							Todo App
						</RouterLink>
					</Typography>

					{/* ナビゲーションボタン */}
					<Button color="inherit" component={RouterLink} to="/">
						Home
					</Button>

					{!isAuthenticated ? (
						<Button color="inherit" component={RouterLink} to="/user/login">
							ログイン
						</Button>
					) : (
						<Button color="inherit" onClick={handleLogout}>
							ログアウト
						</Button>
					)}
				</Toolbar>
			</AppBar>

			{/* メインコンテンツエリア */}
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Outlet />
			</Container>
		</Box>
	);
};
