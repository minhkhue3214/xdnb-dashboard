import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationStore } from '~/hooks/authentication';

// project imports
import MainLayout from '~/layout/MainLayout';
import Loadable from '~/ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('~/views/dashboard/Default')));

// sample page routing
const UserPage = Loadable(lazy(() => import('~/views/pages/users')));
const SecurityTeamPage = Loadable(lazy(() => import('~/views/pages/securityTeams')));
const OrganizationPage = Loadable(lazy(() => import('~/views/pages/organization')));
const ForgotCheckoutReportPage = Loadable(lazy(() => import('~/views/pages/singularNoun/ForgotCheckoutReport')));
const LatePatrolRequestPage = Loadable(lazy(() => import('~/views/pages/singularNoun/LatePatrolRequest')));
const LeaveRequestPage = Loadable(lazy(() => import('~/views/pages/singularNoun/LeaveRequest')));
const PatrolRequestPage = Loadable(lazy(() => import('~/views/pages/singularNoun/PatrolRequest')));

function ProtectedRoute() {
  // Kiểm tra trạng thái đăng nhập ở đây
  const { authenticationState } = useAuthenticationStore(); // Thay checkLoginStatus bằng hàm kiểm tra trạng thái đăng nhập thực tế

  console.log('authenticationState.loginInfo', authenticationState.loginInfo);

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
      path: 'security-teams',
      element: <SecurityTeamPage />
    },
    {
      path: 'organization',
      element: <OrganizationPage />
    },
    {
      path: 'singular-noun',
      children: [
        {
          path: 'leave-request',
          element: <LeaveRequestPage />
        },
        {
          path: 'patrol-request',
          element: <PatrolRequestPage />
        },
        {
          path: 'late-patrol-request',
          element: <LatePatrolRequestPage />
        },
        {
          path: 'forgot-checkout-report',
          element: <ForgotCheckoutReportPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
