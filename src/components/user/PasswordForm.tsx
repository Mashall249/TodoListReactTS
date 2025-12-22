import { useForm } from 'react-hook-form';
import type { ChangePasswordType } from '../../types/User';
import { Stack, TextField } from '@mui/material';
import { LoadingSubmitButton } from '../LoadingSubmitButton';

type Props = {
	onSubmit: (data: ChangePasswordType) => Promise<void>;
};

export const PasswordForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<ChangePasswordType>();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2}>
				<TextField
					label="現在のパスワード"
					type="password"
					{...register('currentPassword', { required: true })}
				/>

				<TextField
					label="新しいパスワード"
					type="password"
					{...register('newPassword', { required: true })}
				/>

				<TextField
					label="確認用パスワード"
					type="password"
					{...register('confirmPassword', {
						validate: (v) => v === getValues('newPassword') || '一致しません',
					})}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
				/>

				<LoadingSubmitButton label="パスワード変更" loading={isSubmitting} />
			</Stack>
		</form>
	);
};
