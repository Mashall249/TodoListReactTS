import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const UserLayout = () => {
	return (
		<Container maxWidth="md">
			<Outlet />
		</Container>
	);
};
