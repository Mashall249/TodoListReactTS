import { Alert, Collapse } from '@mui/material';

type ErrorMessageProps = {
	message?: string | null;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
	if (!message) return null;

	return (
		<Collapse in={!!message}>
			<Alert severity="error" sx={{ mb: 2 }}>
				{message}
			</Alert>
		</Collapse>
	);
};
