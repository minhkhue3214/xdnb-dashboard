import { IconUser, IconNote, IconCategory } from '@tabler/icons';

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
      icon: IconUser
    },
    {
      id: 'posts',
      title: 'menu.posts',
      type: 'item',
      url: '/posts',
      icon: IconNote
    },
    {
      id: 'categories',
      title: 'menu.categories',
      type: 'item',
      url: '/categories',
      icon: IconCategory
    },
    {
      id: 'products',
      title: 'menu.products',
      type: 'item',
      url: '/products',
      icon: IconNote
    }
  ]
};

export default pages;
