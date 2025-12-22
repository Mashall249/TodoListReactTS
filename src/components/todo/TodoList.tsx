import type { FC } from 'react';
import type { TodoEntityType } from '../../types/Todo';
import { TodoItem } from './TodoItem';
import { TodoFilterControl, type TodoFilterProps } from './TodoFilterControl';
import { Grid, Paper, Typography } from '@mui/material';

type TodoListProps = TodoFilterProps & {
	todos: TodoEntityType[];
	onClickEdit: (todo: TodoEntityType) => void;
	onClickDelete: (id: number) => void;
};

export const TodoList: FC<TodoListProps> = ({
	todos,
	onClickEdit,
	onClickDelete,
	filter,
	sortKey,
	setFilter,
	setSortKey,
}) => {
	return (
		<Paper
			elevation={1}
			sx={{
				p: 3,
				mt: 2,
				borderRadius: 3,
			}}
		>
			<Typography variant="h5">登録済み Todo</Typography>

			<TodoFilterControl
				filter={filter}
				sortKey={sortKey}
				setFilter={setFilter}
				setSortKey={setSortKey}
			/>

			{todos.length === 0 && (
				<Typography
					variant="body1"
					color="text.secondary"
					sx={{ mt: 4, textAlign: 'center' }}
				>
					表示するTodoはありません
				</Typography>
			)}

			<Grid container spacing={2} sx={{ mt: 2 }}>
				{todos.map((todo) => (
					<Grid size={{ xs: 12, sm: 6, md: 4 }} key={todo.id}>
						<TodoItem
							item={todo}
							onClickEdit={onClickEdit}
							onClickDelete={() => onClickDelete(todo.id)}
						/>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};
