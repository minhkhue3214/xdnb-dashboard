import { lazy } from 'react';

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

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
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
        },
      ]
    },
  ]
};

export default MainRoutes;
