import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

type ConfirmDialogProps = {
	open: boolean;
	title?: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
};

export const ConfirmDialog = ({
	open,
	title = '確認',
	message,
	onConfirm,
	onCancel,
}: ConfirmDialogProps) => {
	return (
		<Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
			<DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>

			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={onCancel} color="inherit">
					キャンセル
				</Button>

				<Button color="error" variant="contained" onClick={onConfirm} autoFocus>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
};
