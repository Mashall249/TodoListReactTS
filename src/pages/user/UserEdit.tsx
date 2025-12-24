import { useEffect, useState } from 'react';
import type { ChangePasswordType, EditType } from '../../types/User';
import { useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '../../utils/error';
import { useAuth } from '../../hooks/useAuth';
import { ErrorMessage } from '../../components/ErrorMessage';
import { EditForm } from '../../components/user/EditForm';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { PasswordForm } from '../../components/user/PasswordForm';
import { authApi } from '../../api/auth';

export const UserEdit = () => {
	const navigate = useNavigate();
	const { updateProfile, changePassword, deleteAccount } = useAuth();
	const { showSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [defaultValues, setDefaultValues] = useState<EditType | null>(null);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const user = await authApi.getProfile();
				setDefaultValues({
					username: user.username,
					email: user.email,
				});
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e) {
				setError('ユーザー情報の取得に失敗しました');
			} finally {
				setIsFetching(false);
			}
		};
		fetchProfile();
	}, []);

	const handleProfileEdit = async (data: EditType) => {
		try {
			setLoading(true);
			await updateProfile(data);
			showSnackbar('プロフィールを更新しました', 'success');
			navigate('/user/mypage');
		} catch (e) {
			setError(getApiErrorMessage(e));
		} finally {
			setLoading(false);
		}
	};

	// パスワード変更
	const handlePassword = async (data: ChangePasswordType) => {
		await changePassword(data);
		showSnackbar('パスワードを変更しました', 'success');
		navigate('/user/mypage');
	};

	// 退会
	const handleDelete = async () => {
		await deleteAccount();
	};

	return (
		<Box maxWidth={500} mx="auto" py={4}>
			<Typography variant="h5" mb={2} fontWeight="bold">
				ユーザー編集
			</Typography>

			{/* ロード中 */}
			{isFetching ? (
				<Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
					<CircularProgress />
				</Box>
			) : (
				<>
					{/* ロード終了後 */}
					<ErrorMessage message={error} />

					{/* データが取れていればフォームを表示 */}
					{defaultValues && (
						<>
							<EditForm
								onSubmitUser={handleProfileEdit}
								defaultValues={defaultValues}
								isLoading={loading}
							/>

							<Divider sx={{ my: 4 }} />

							<Typography variant="h6" mb={2}>
								パスワード変更
							</Typography>

							<PasswordForm onSubmit={handlePassword} />

							<Divider sx={{ my: 4 }} />

							<Button color="error" onClick={() => setOpenConfirm(true)}>
								退会する
							</Button>

							<ConfirmDialog
								open={openConfirm}
								title="退会確認"
								message="本当に退会しますか？この操作は取り消せません。"
								onCancel={() => setOpenConfirm(false)}
								onConfirm={handleDelete}
							/>
						</>
					)}
				</>
			)}
		</Box>
	);
};
