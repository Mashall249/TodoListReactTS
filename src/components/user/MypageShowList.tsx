import { useState } from 'react';
import { useTodo } from '../../hooks/useTodo';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { AddTask, Edit } from '@mui/icons-material';
import { TodoList } from '../todo/TodoList';
import { TodoForm } from '../todo/TodoForm';
import { useSnackbar } from '../../hooks/useSnackbar';
import type { TodoEntityType, TodoFormType } from '../../types/Todo';
import { useNavigate } from 'react-router-dom';

// APIから来たデータ(ISO文字列)を、フォーム用(YYYY-MM-DD)に変換するヘルパー関数
const convertEntityToForm = (entity: TodoEntityType): TodoFormType => {
	return {
		title: entity.title,
		details: entity.details,
		situation: entity.situation,
		// ISO文字列(2023-01-01T00:00:00) の先頭10文字を切り取れば YYYY-MM-DD になる（記録→時間、表示→日付）
		dueDate: entity.dueDate.substring(0, 10),
	};
};

export const MypageShowList = () => {
	const [openModal, setOpenModal] = useState(false);
	const { showSnackbar } = useSnackbar();
	const navigate = useNavigate();
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

	// モーダルを開く処理（追加・編集共通）
	const handleOpenAdd = () => {
		resetEdit();
		setOpenModal(true);
	};

	const handleOpenEdit = (todo: TodoEntityType) => {
		startEdit(todo);
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		resetEdit(); // 閉じるときに編集状態をリセットしておくと安全
	};

	// 保存処理
	const handleSave = async (data: TodoFormType) => {
		try {
			const result = await saveTodo(data);
			showSnackbar(result === 'add' ? 'Todoを追加しました' : 'Todoを更新しました', 'success');
			handleCloseModal();
		} catch (e) {
			// エラー処理はapiやhook側でログが出ているが、UIにも通知するならここ
			console.error(e);
			showSnackbar('保存に失敗しました', 'error');
		}
	};

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
			<Container maxWidth="lg">
				{/* ヘッダー */}
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
					<Typography variant="h4" fontWeight="bold" color="text.primary">
						マイページ
					</Typography>

					<Box display="flex" gap={2}>
						<Button
							variant="outlined"
							startIcon={<Edit />}
							onClick={() => navigate('/user/edit')}
						>
							プロフィール編集
						</Button>

						<Button
							variant="contained"
							size="large"
							startIcon={<AddTask />}
							onClick={handleOpenAdd}
						>
							新規追加
						</Button>
					</Box>
				</Box>

				{/* Todo一覧 */}
				<TodoList
					todos={todos}
					filter={filter}
					sortKey={sortKey}
					setFilter={setFilter}
					setSortKey={setSortKey}
					onClickEdit={handleOpenEdit}
					onClickDelete={deleteTodo}
				/>

				{/* モーダル */}
				<Modal open={openModal} onClose={handleCloseModal}>
					<Box sx={modalStyle}>
						{/* モーダルの中身だけ分離しておくと、閉じるボタン等を付けやすい */}
						<TodoForm
							// 編集モードならデータを変換して渡す、そうでなければnull(Form側でDefault値使用)
							defaultValues={editingTodo ? convertEntityToForm(editingTodo) : null}
							isEdit={!!editingTodo}
							onSubmitTodo={handleSave}
						/>
					</Box>
				</Modal>
			</Container>
		</Box>
	);
};

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
