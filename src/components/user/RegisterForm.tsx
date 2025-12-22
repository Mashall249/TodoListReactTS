import { useForm, type SubmitHandler } from 'react-hook-form';
import type { RegisterFormType, RegisterRequestType } from '../../types/User';
import { Stack, TextField } from '@mui/material';
import { LoadingSubmitButton } from '../LoadingSubmitButton';

type RegisterFormProps = {
	onSubmitUser: (data: RegisterRequestType) => void;
	isLoading: boolean;
};

export const RegisterForm = ({ onSubmitUser, isLoading }: RegisterFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<RegisterFormType>();

	const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
		const sendData: RegisterRequestType = {
			username: data.username,
			email: data.email,
			password: data.password,
		};

		await onSubmitUser(sendData);
		reset();
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
					label="メールアドレス"
					{...register('email', { required: '必須です' })}
					error={!!errors.email}
					helperText={errors.email?.message}
					disabled={isLoading}
					fullWidth
				/>

				<TextField
					label="パスワード"
					type="password"
					{...register('password', { required: '必須です' })}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
					disabled={isLoading}
					fullWidth
				/>

				<TextField
					label="パスワード（確認）"
					type="password"
					{...register('confirmPassword', {
						required: '確認用パスワードを入力してください',
						validate: (value) =>
							value === getValues('password') || 'パスワードが一致しません',
					})}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
					disabled={isLoading}
					fullWidth
				/>

				<LoadingSubmitButton label="登録する" loading={isLoading} />
			</Stack>
		</form>
	);
};
