import { useForm, type SubmitHandler } from 'react-hook-form';
import type { LoginRequestType } from '../../types/User';
import { Stack, TextField } from '@mui/material';
import { LoadingSubmitButton } from '../LoadingSubmitButton';

type LoginFormProps = {
	onSubmitUser: (data: LoginRequestType) => Promise<void>;
	isLoading: boolean;
};

export const LoginForm = ({ onSubmitUser, isLoading }: LoginFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginRequestType>();

	const onSubmit: SubmitHandler<LoginRequestType> = async (data) => {
		if (isLoading) return;
		await onSubmitUser(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2}>
				<TextField
					label="ユーザー名"
					{...register('username', { required: '必須です' })}
					error={!!errors.username}
					helperText={errors.username?.message}
					disabled={isLoading}
					fullWidth
				/>

				<TextField
					label="パスワード"
					type="password"
					{...register('password', { required: '必須です' })}
					error={!!errors.password}
					helperText={errors.password?.message}
					disabled={isLoading}
					fullWidth
				/>

				<LoadingSubmitButton label="ログイン" loading={isLoading} />
			</Stack>
		</form>
	);
};
