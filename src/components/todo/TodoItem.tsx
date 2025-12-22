import type { FC } from 'react';
import type { TodoEntityType } from '../../types/Todo';
import 'dayjs/locale/ja';
import { formatDate } from '../../utils/date';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { SITUATION_MASTER } from '../../types/TodoSituation';

type TodoItemProps = {
	item: TodoEntityType;
	onClickEdit: (v: TodoEntityType) => void;
	onClickDelete: () => void;
};

export const TodoItem: FC<TodoItemProps> = ({ item, onClickEdit, onClickDelete }) => {
	const statusStyle = SITUATION_MASTER[item.situation] || SITUATION_MASTER.untouch;

	return (
		<Card
			elevation={2}
			sx={{
				height: '100%', // Grid内で高さを揃える
				display: 'flex',
				flexDirection: 'column',
				borderLeft: 6,
				borderColor: statusStyle.borderColor,
				transition: 'transform 0.2s',
				'&:hover': { transform: 'translateY(-2px)' }, // ホバー時のちょっとした演出
			}}
		>
			<CardContent sx={{ flexGrow: 1 }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="flex-start"
					mb={1.5}
				>
					<Typography
						variant="h6"
						component="div"
						sx={{ fontWeight: 'bold', lineHeight: 1.3 }}
					>
						{item.title}
					</Typography>
					<Chip
						label={statusStyle.label}
						color={statusStyle.chipColor}
						size="small"
						variant="outlined" // 少し見た目を軽くする提案
					/>
				</Stack>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 2, whiteSpace: 'pre-wrap' }}
				>
					{item.details}
				</Typography>

				{/* 日付情報の整理 */}
				<Stack spacing={0.5} sx={{ mt: 'auto', bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
					<DateRow label="期限" date={item.dueDate} isBold />
					<DateRow label="作成" date={item.createdAt} />
					<DateRow label="更新" date={item.updatedAt} />
				</Stack>
			</CardContent>

			<CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
				<Button size="small" startIcon={<Edit />} onClick={() => onClickEdit(item)}>
					編集
				</Button>
				<Button size="small" color="error" startIcon={<Delete />} onClick={onClickDelete}>
					削除
				</Button>
			</CardActions>
		</Card>
	);
};

// 小さなサブコンポーネント
const DateRow = ({
	label,
	date,
	isBold = false,
}: {
	label: string;
	date: string;
	isBold?: boolean;
}) => (
	<Stack direction="row" justifyContent="space-between">
		<Typography variant="caption" color="text.secondary">
			{label}
		</Typography>
		<Typography
			variant="caption"
			fontWeight={isBold ? 'bold' : 'normal'}
			color={isBold && dayjs(date).isBefore(dayjs()) ? 'error' : 'text.primary'} // 期限切れ
		>
			{formatDate(date)}
		</Typography>
	</Stack>
);

import dayjs from 'dayjs'; // DateRow内で使用するためimport追加
