import { useForm, type SubmitHandler } from 'react-hook-form';
import type { EditType } from '../../types/User';
import { Stack, TextField } from '@mui/material';
import { LoadingSubmitButton } from '../LoadingSubmitButton';
import { useEffect } from 'react';

type EditFormProps = {
	defaultValues?: EditType;
	onSubmitUser: (data: EditType) => Promise<void>;
	isLoading: boolean;
};

export const EditForm = ({ defaultValues, onSubmitUser, isLoading }: EditFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EditType>({ defaultValues });

	const onSubmit: SubmitHandler<EditType> = async (data) => {
		if (isLoading) return;
		await onSubmitUser(data);
	};

	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

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
					type="email"
					{...register('email', { required: '必須です' })}
					error={!!errors.email}
					helperText={errors.email?.message}
					disabled={isLoading}
					fullWidth
				/>

				<LoadingSubmitButton label="更新" loading={isLoading} />
			</Stack>
		</form>
	);
};
