import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Button, Container, Typography } from '@mui/material';

export const HomePage = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Container maxWidth="md">
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				minHeight="80vh"
				gap={4}
			>
				<Typography variant="h3" fontWeight="bold">
					Todo管理
				</Typography>

				<Typography variant="body1" color="text.secondary">
					シンプルにタスクを管理しましょう
				</Typography>

				{!isAuthenticated ? (
					<Button
						variant="contained"
						size="large"
						component={RouterLink}
						to="/user/register"
					>
						新規登録する
					</Button>
				) : (
					<Button
						variant="contained"
						size="large"
						component={RouterLink}
						to="/user/mypage"
					>
						マイページへ
					</Button>
				)}
			</Box>
		</Container>
	);
};
