import type { FC } from 'react';
import type { FilterBySituation, SortedByDates, TodoEntityType } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodoFilterControl } from './TodoFilterControl';
import { Grid, Paper, Typography } from '@mui/material';

type TodoListProps = {
	currentTodos: TodoEntityType[];
	onClickEdit: (todo: TodoEntityType) => void;
	onClickDelete: (id: string) => void;

	filter: FilterBySituation;
	sortKey: SortedByDates;
	onChangeByFilter: (v: FilterBySituation) => void;
	onChangeBySort: (v: SortedByDates) => void;
};

export const TodoList: FC<TodoListProps> = ({
	currentTodos,
	onClickEdit,
	onClickDelete,
	filter,
	sortKey,
	onChangeByFilter,
	onChangeBySort,
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
				onChangeByFilter={onChangeByFilter}
				onChangeBySort={onChangeBySort}
			/>

			<Grid container spacing={2} sx={{ mt: 2 }}>
				{currentTodos.map((todo) => (
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
