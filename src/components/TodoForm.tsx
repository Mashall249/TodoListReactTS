import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import type { TodoFormType } from '../types/Todo';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { AdsClick } from '@mui/icons-material';
import { SITUATION_OPTIONS } from '../types/TodoSituation';

type TodoFormProps = {
	defaultValues?: TodoFormType;
	isEdit: boolean;
	onSubmitTodo: (data: TodoFormType) => void;
};

export const TodoForm = ({ defaultValues, isEdit, onSubmitTodo }: TodoFormProps) => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TodoFormType>({
		defaultValues: defaultValues || {
			title: '',
			details: '',
			situation: 'untouch',
			dueDate: '',
		},
	});

	useEffect(() => {
		reset(
			defaultValues ?? {
				title: '',
				details: '',
				situation: 'untouch',
				dueDate: '',
			}
		);
	}, [defaultValues, reset]);

	const onSubmit: SubmitHandler<TodoFormType> = (data) => {
		onSubmitTodo(data);
		reset();
	};

	return (
		<Box>
			<Typography variant="h6" mb={2}>
				{isEdit ? 'Todo更新' : 'Todo追加'}
			</Typography>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<TextField
						label="タイトル"
						placeholder="タイトルを入力"
						{...register('title', {
							required: 'タイトルは必須です。',
							maxLength: {
								value: 30,
								message: '30文字以内で、簡潔に入力してください。',
							},
						})}
						error={!!errors.title}
						helperText={errors.title?.message}
						fullWidth
					/>

					<TextField
						label="詳細"
						placeholder="詳細内容を入力"
						{...register('details', {
							required: '詳細内容は必須です。',
						})}
						error={!!errors.details}
						helperText={errors.details?.message}
						fullWidth
						multiline
						minRows={3}
					/>

					<Controller
						name="situation"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<TextField select label="状況" {...field} fullWidth>
								{SITUATION_OPTIONS.map((s) => (
									<MenuItem key={s.value} value={s.value}>
										{s.label}
									</MenuItem>
								))}
							</TextField>
						)}
					/>

					<TextField
						label="期限"
						type="date"
						slotProps={{ inputLabel: { shrink: true } }}
						{...register('dueDate', {
							required: '日付を入力してください',
						})}
						error={!!errors.dueDate}
						helperText={errors.dueDate?.message}
						fullWidth
					/>

					<Button
						type="submit"
						variant="contained"
						size="large"
						color={isEdit ? 'warning' : 'primary'}
						endIcon={<AdsClick />}
					>
						{isEdit ? '更新' : '登録'}
					</Button>
				</Stack>
			</form>
		</Box>
	);
};
