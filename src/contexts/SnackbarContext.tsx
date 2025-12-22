import { Alert, Snackbar } from '@mui/material';
import { createContext, useCallback, useState, type ReactNode } from 'react';
import type { SnackbarContextType, SnackbarSeverity } from '../types/UI';

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<SnackbarSeverity>('info');

	const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'info') => {
		setMessage(message);
		setSeverity(severity);
		setOpen(true);
	}, []);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	};

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}

			{/* Snackbar は常に1個 */}
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity={severity} variant="filled">
					{message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

export { SnackbarContext, SnackbarProvider };
