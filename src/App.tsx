import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Box, Button, Container, Modal, Snackbar, Typography } from '@mui/material';
import { useTodo } from './hooks/useTodo';
import { AddTask } from '@mui/icons-material';

export default function App() {
	const [openModal, setOpenModal] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const {
		todos,
		editingTodo,
		filter,
		sortKey,
		setFilter,
		setSortKey,
		saveTodo,
		deleteTodo,
		startEdit,
		resetEdit,
	} = useTodo();

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: 'grey.50',
				py: 4,
			}}
		>
			<Container maxWidth="lg">
				{/* ヘッダー */}
				<Box display="flex" justifyContent="space-between" mb={3}>
					<Typography variant="h4">Todo List</Typography>
					<Button
						variant="contained"
						color="primary"
						endIcon={<AddTask />}
						onClick={() => {
							resetEdit();
							setOpenModal(true);
						}}
					>
						追加
					</Button>
				</Box>

				{/* Todo一覧 */}
				<TodoList
					currentTodos={todos}
					filter={filter}
					sortKey={sortKey}
					onChangeByFilter={setFilter}
					onChangeBySort={setSortKey}
					onClickEdit={(todo) => {
						startEdit(todo);
						setOpenModal(true);
					}}
					onClickDelete={deleteTodo}
				/>

				{/* 追加・編集フォームをモーダルで表示 */}
				<Modal open={openModal} onClose={() => setOpenModal(false)}>
					<Box sx={modalStyle}>
						<TodoForm
							defaultValues={
								editingTodo
									? {
											title: editingTodo.title,
											details: editingTodo.details,
											situation: editingTodo.situation,
											dueDate: editingTodo.dueDate
												.toDate()
												.toISOString()
												.slice(0, 10),
									  }
									: undefined
							}
							isEdit={!!editingTodo}
							onSubmitTodo={async (data) => {
								const result = await saveTodo(data);

								setSnackbarMessage(
									result === 'add' ? '追加しました' : '更新しました'
								);
								setOpenModal(false);
								setOpenSnackbar(true);
							}}
						/>
					</Box>
				</Modal>

				{/* 通知 */}
				<Snackbar
					open={openSnackbar}
					autoHideDuration={3000}
					onClose={() => setOpenSnackbar(false)}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					message={snackbarMessage}
					slotProps={{
						content: {
							sx: {
								backgroundColor: 'green',
								color: 'white',
							},
						},
					}}
				/>
			</Container>
		</Box>
	);
}

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};
