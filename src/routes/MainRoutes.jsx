import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationStore } from '~/hooks/authentication';

import MainLayout from '~/layout/MainLayout';
import Loadable from '~/ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('~/views/dashboard/Default')));

const UserPage = Loadable(lazy(() => import('~/views/pages/users')));
const PagePost = Loadable(lazy(() => import('~/views/pages/posts')));
const PageCategory = Loadable(lazy(() => import('~/views/pages/categories')));
const PageProduct = Loadable(lazy(() => import('~/views/pages/products')));

function ProtectedRoute() {
  const { authenticationState } = useAuthenticationStore();

  return authenticationState.loginInfo ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'users',
      element: <UserPage />
    },
    {
      path: 'posts',
      element: <PagePost />
    },
    {
      path: 'categories',
      element: <PageCategory />
    },
    {
      path: 'products',
      element: <PageProduct />
    }
  ]
};

export default MainRoutes;
