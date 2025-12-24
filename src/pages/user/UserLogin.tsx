import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/user/LoginForm';
import { useState } from 'react';
import type { LoginRequestType } from '../../types/User';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';

export const UserLogin = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (data: LoginRequestType) => {
		try {
			setLoading(true);
			setError(null);

			await login(data.username, data.password);

			navigate('/user/mypage');
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			setError('ユーザー名もしくはパスワードが間違っています。');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box maxWidth={400} mx="auto" mt={4}>
			<Typography variant="h5" mb={2}>
				ログイン
			</Typography>
			<ErrorMessage message={error} />
			<LoginForm onSubmitUser={handleLogin} isLoading={loading} />
			<Typography variant="body2" mt={2} textAlign="right">
				新規登録は<Link to="/user/register">こちら</Link>
			</Typography>
		</Box>
	);
};
