import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationStore } from '~/hooks/authentication';

// project imports
import MinimalLayout from '~/layout/MinimalLayout';
import Loadable from '~/ui-component/Loadable';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('~/views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('~/views/pages/authentication/authentication3/Register3')));
const RecoveryPassword1 = Loadable(lazy(() => import('~/views/pages/authentication/authentication3/RecoveryPassword1')));
const RecoveryPassword2 = Loadable(lazy(() => import('~/views/pages/authentication/authentication3/RecoveryPassword2')));

function NoneProtectedRoute() {
  // Kiểm tra trạng thái đăng nhập ở đây
  const { authenticationState } = useAuthenticationStore(); // Thay checkLoginStatus bằng hàm kiểm tra trạng thái đăng nhập thực tế

  return !authenticationState.loginInfo ? (
    <MinimalLayout>
      <Outlet />
    </MinimalLayout>
  ) : (
    <Navigate to="/" replace />
  );
}

const AuthenticationRoutes = {
  path: '/',
  element: <NoneProtectedRoute />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path: '/recoverypassword1',
      element: <RecoveryPassword1 />
    },
    {
      path: '/recoverypassword2',
      element: <RecoveryPassword2 />
    },
  ]
};

export default AuthenticationRoutes;
