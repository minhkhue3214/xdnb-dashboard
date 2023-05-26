// assets
import { IconKey, IconUser, IconSteam, IconBuildingCommunity, IconFileDescription } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUser,
  IconSteam,
  IconBuildingCommunity,
  IconFileDescription
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.IconUser,
    },
    {
      id: 'security-teams',
      title: 'Security Teams',
      type: 'item',
      url: '/security-teams',
      icon: icons.IconSteam,
    },
    {
      id: 'organization',
      title: 'Organization',
      type: 'item',
      url: '/organization',
      icon: icons.IconBuildingCommunity,
    },
    {
      id: 'singular-noun',
      title: 'Singular Noun',
      type: 'collapse',
      icon: icons.IconFileDescription,

      children: [
        {
          id: 'leave-request',
          title: 'Leave Request',
          type: 'item',
          url: '/singular-noun/leave-request',
        },
        {
          id: 'patrol-request',
          title: 'Patrol Request',
          type: 'item',
          url: '/singular-noun/patrol-request',
        },
        {
          id: 'late-patrol-request',
          title: 'Late Patrol Request',
          type: 'item',
          url: '/singular-noun/late-patrol-request',
        },
        {
          id: 'forgot-checkout-report',
          title: 'Forgot Checkout Report',
          type: 'item',
          url: '/singular-noun/forgot-checkout-report',
        },
      ]
    },
  ]
};

export default pages;
