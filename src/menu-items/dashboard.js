// assets
import { IconFileReport } from '@tabler/icons';

const dashboard = {
  id: 'dashboard',
  title: 'menu.dashboard',
  type: 'group',
  children: [
    {
      id: 'requests',
      title: 'menu.consultationRequests',
      type: 'item',
      url: '/requests',
      icon: IconFileReport
    }
  ]
};

export default dashboard;
