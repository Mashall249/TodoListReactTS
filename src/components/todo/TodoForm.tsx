import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import type { TodoFormType } from '../../types/Todo';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { AdsClick } from '@mui/icons-material';
import { SITUATION_OPTIONS } from '../../types/TodoSituation';

type TodoFormProps = {
	defaultValues?: TodoFormType | null;
	isEdit: boolean;
	onSubmitTodo: (data: TodoFormType) => void;
};

// 初期値
const EMPTY_FORM_VALUES: TodoFormType = {
	title: '',
	details: '',
	situation: 'untouch',
	dueDate: '',
};

export const TodoForm = ({ defaultValues, isEdit, onSubmitTodo }: TodoFormProps) => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<TodoFormType>({
		// defaultValuesがnull/undefinedなら空の値をセット
		defaultValues: defaultValues ?? EMPTY_FORM_VALUES,
	});

	useEffect(() => {
		reset(defaultValues ?? EMPTY_FORM_VALUES);
	}, [defaultValues, reset]);

	const onSubmit: SubmitHandler<TodoFormType> = (data) => {
		onSubmitTodo(data);
	};

	return (
		<Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
			<Typography variant="h6" mb={2} fontWeight="bold">
				{isEdit ? 'Todoを編集' : '新しいTodoを作成'}
			</Typography>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<TextField
						label="タイトル"
						placeholder="タイトルを入力してください"
						{...register('title', {
							required: 'タイトルは必須です。',
							maxLength: { value: 30, message: '30文字以内で入力してください。' },
						})}
						error={!!errors.title}
						helperText={errors.title?.message}
						fullWidth
					/>

					<TextField
						label="詳細"
						placeholder="詳細を入力してください"
						{...register('details', { required: '詳細内容は必須です。' })}
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
							<TextField {...field} select label="状況" fullWidth>
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
						{...register('dueDate', { required: '日付を入力してください' })}
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
						disabled={isSubmitting} // 二重送信防止
						sx={{ mt: 1 }}
					>
						{isEdit ? '更新する' : '登録する'}
					</Button>
				</Stack>
			</form>
		</Box>
	);
};
