import { RouterProvider } from 'react-router-dom';
import { router } from './router/AppRoutes';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { AuthProvider } from './contexts/AuthContext';
import { ConfirmProvider } from './contexts/ConfirmContext';

export default function App() {
	return (
		<AuthProvider>
			<SnackbarProvider>
				<ConfirmProvider>
					<RouterProvider router={router} />
				</ConfirmProvider>
			</SnackbarProvider>
		</AuthProvider>
	);
}
