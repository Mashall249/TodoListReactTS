import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

type LoadingSubmitButtonProps = {
	loading: boolean;
	label?: string;
	disabled?: boolean;
	startIcon?: React.ReactNode;
};

export const LoadingSubmitButton = ({
	loading,
	label = '保存',
	disabled,
	startIcon = <Save />,
}: LoadingSubmitButtonProps) => {
	return (
		<LoadingButton
			type="submit"
			variant="contained"
			fullWidth
			loading={loading}
			loadingPosition="start"
			startIcon={startIcon}
			disabled={disabled}
			sx={{ mt: 2 }}
		>
			{label}
		</LoadingButton>
	);
};
