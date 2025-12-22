import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/user/RegisterForm';
import { useState } from 'react';
import type { RegisterRequestType } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';
import { getApiErrorMessage } from '../../utils/error';
import { ErrorMessage } from '../../components/ErrorMessage';
import { authApi } from '../../api/auth';

export const UserRegister = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRegister = async (data: RegisterRequestType) => {
		setIsLoading(true);
		setError(null);

		try {
			await authApi.register(data);
			// 自動ログイン
			await login(data.username, data.password);
			// マイページへ
			navigate('/user/mypage', { replace: true });
		} catch (e) {
			setError(getApiErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Box>
			<Typography variant="h5">新規登録</Typography>
			<ErrorMessage message={error} />
			<RegisterForm onSubmitUser={handleRegister} isLoading={isLoading} />
			<Typography variant="body1" mt={2}>
				ログインは<Link to="/user/login">こちら</Link>
			</Typography>
		</Box>
	);
};
