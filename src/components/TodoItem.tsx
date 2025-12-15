import type { FC } from 'react';
import { SITUATION_LABELS, type TodoEntityType } from '../types/Todo';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { formatDate } from '../utils/formatDate';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
dayjs.locale('ja');

type TodoItemProps = {
	item: TodoEntityType;
	onClickEdit: (v: TodoEntityType) => void;
	onClickDelete: () => void;
};

export const TodoItem: FC<TodoItemProps> = ({ item, onClickEdit, onClickDelete }) => {
	return (
		<Card
			sx={{
				borderLeft: 4,
				borderColor:
					item.situation === 'complete'
						? 'success.main'
						: item.situation === 'process'
						? 'warning.main'
						: 'grey.300',
			}}
		>
			<CardContent>
				<Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
					<Typography variant="h6">{item.title}</Typography>
					<Chip
						label={SITUATION_LABELS[item.situation]}
						color={
							item.situation === 'complete'
								? 'success'
								: item.situation === 'process'
								? 'warning'
								: 'default'
						}
						size="small"
					/>
				</Stack>

				<Typography variant="body2" sx={{ mb: 1 }}>
					{item.details}
				</Typography>

				<Stack spacing={0.5}>
					<Typography variant="caption">期限：{formatDate(item.dueDate)}</Typography>
					<Typography variant="caption">作成日：{formatDate(item.createdAt)}</Typography>
					<Typography variant="caption">更新日：{formatDate(item.updatedAt)}</Typography>
				</Stack>
			</CardContent>

			<CardActions sx={{ justifyContent: 'flex-end' }}>
				<Button
					color="primary"
					variant="contained"
					size="small"
					endIcon={<Edit />}
					onClick={() => onClickEdit(item)}
				>
					編集
				</Button>

				<Button
					color="error"
					variant="contained"
					size="small"
					endIcon={<Delete />}
					onClick={onClickDelete}
				>
					削除
				</Button>
			</CardActions>
		</Card>
	);
};
