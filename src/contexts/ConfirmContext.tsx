import { createContext, useCallback, useRef, useState, type ReactNode } from 'react';
import type { ConfirmContextType, ConfirmOptions } from '../types/UI';
import { ConfirmDialog } from '../components/ConfirmDialog';

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

const ConfirmProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<ConfirmOptions>({ message: '' });

	// ?
	const resolverRef = useRef<((value: boolean) => void) | null>(null);

	const confirm = useCallback((options: ConfirmOptions) => {
		setOptions(options);
		setOpen(true);

		return new Promise<boolean>((resolve) => {
			resolverRef.current = resolve;
		});
	}, []);

	const handleConfirm = () => {
		setOpen(false);
		resolverRef.current?.(true);
	};

	const handleCancel = () => {
		setOpen(false);
		resolverRef.current?.(false);
	};

	return (
		<ConfirmContext.Provider value={{ confirm }}>
			{children}

			<ConfirmDialog
				open={open}
				title={options.title}
				message={options.message}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</ConfirmContext.Provider>
	);
};

export { ConfirmContext, ConfirmProvider };
