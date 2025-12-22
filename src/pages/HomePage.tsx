import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const HomePage = () => {
	const { isAuthenticated } = useAuth();
	return (
		<>
			<h1>Todo管理</h1>

			{!isAuthenticated ? (
				<Link to="/user/register">新規登録する</Link>
			) : (
				<Link to="/user/mypage">マイページへ</Link>
			)}
		</>
	);
};
