import { IconBuildingCommunity, IconClock, IconFileDescription, IconKey, IconUser } from '@tabler/icons';

const icons = {
  IconKey,
  IconUser,
  IconClock,
  IconBuildingCommunity,
  IconFileDescription
};

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'menu.users',
      type: 'item',
      url: '/users',
      icon: icons.IconUser
    }
  ]
};

export default pages;
