// --- Confirm Dialog ---
export type ConfirmOptions = {
	title?: string;
	message: string;
};

export type ConfirmContextType = {
	confirm: (options: ConfirmOptions) => Promise<boolean>;
};

// --- Snackbar ---
export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

export type SnackbarContextType = {
	showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
};

// --- Error ---
export type ApiErrorResponse = {
	timestamp?: string;
	status?: number;
	error?: string;
	message?: string;
	path?: string;
};
