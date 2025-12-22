import { createBrowserRouter, Navigate } from 'react-router-dom';
// レイアウト
import { RootLayout } from '../layouts/RootLayout';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { UserLayout } from '../layouts/UserLayout';

// ページ
import { HomePage } from '../pages/HomePage';
import { UserMypage } from '../pages/user/UserMypage';
import { UserEdit } from '../pages/user/UserEdit';
import { UserLogin } from '../pages/user/UserLogin';
import { UserRegister } from '../pages/user/UserRegister';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				// 認証が必要なエリア
				element: <ProtectedLayout />,
				children: [
					{
						path: 'user',
						element: <UserLayout />,
						children: [
							{
								path: 'mypage',
								element: <UserMypage />,
							},
							{
								path: 'edit',
								element: <UserEdit />,
							},
						],
					},
				],
			},
			{
				// 認証不要（ログイン・登録）
				path: 'user',
				children: [
					{
						path: 'login',
						element: <UserLogin />,
					},
					{
						path: 'register',
						element: <UserRegister />,
					},
				],
			},
			// 未定義のパスへの対策（404の代わり）
			{
				path: '*',
				element: <Navigate to="/" replace />,
			},
		],
	},
]);
