// assets
import { IconBuildingCommunity, IconFileDescription, IconKey, IconSteam, IconUser } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUser,
  IconSteam,
  IconBuildingCommunity,
  IconFileDescription
};

const pages = {
  id: 'pages',
  title: 'Pages',
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
          url: '/login',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/register',
          target: true
        }
      ]
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.IconUser
    },
    {
      id: 'security-teams',
      title: 'Security Teams',
      type: 'item',
      url: '/security-teams',
      icon: icons.IconSteam
    },
    {
      id: 'shifts',
      title: 'Shifts',
      type: 'item',
      url: '/shifts',
      icon: icons.IconSteam
    },
    {
      id: 'organization',
      title: 'Organization',
      type: 'item',
      url: '/organization',
      icon: icons.IconBuildingCommunity
    },
    {
      id: 'singular-noun',
      title: 'Request',
      type: 'collapse',
      icon: icons.IconFileDescription,

      children: [
        {
          id: 'leave-request',
          title: 'Leave Request',
          type: 'item',
          url: '/singular-noun/leave-request'
        },
        {
          id: 'patrol-request',
          title: 'Patrol Request',
          type: 'item',
          url: '/singular-noun/patrol-request'
        },
        {
          id: 'late-patrol-request',
          title: 'Late Patrol Request',
          type: 'item',
          url: '/singular-noun/late-patrol-request'
        },
        {
          id: 'forgot-checkout-report',
          title: 'Forgot Checkout Report',
          type: 'item',
          url: '/singular-noun/forgot-checkout-report'
        }
      ]
    }
  ]
};

export default pages;
