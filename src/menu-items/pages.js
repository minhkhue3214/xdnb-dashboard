import { IconUser, IconNote } from '@tabler/icons';

const icons = {
  IconUser,
  IconNote
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
    },
    {
      id: 'posts',
      title: 'menu.posts',
      type: 'item',
      url: '/posts',
      icon: icons.IconNote
    },
    {
      id: 'products',
      title: 'menu.products',
      type: 'item',
      url: '/products',
      icon: icons.IconNote
    }
  ]
};

export default pages;
