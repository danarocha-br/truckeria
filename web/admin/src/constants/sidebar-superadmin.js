import { FiCalendar, FiTruck, FiGrid } from 'react-icons/fi';

export default {
  Dashboard: {
    icon: { FiTruck },
    title: 'overview',
    to: '/dashboard',
  },
  Users: {
    title: 'users',
    icon: { FiCalendar },
    to: '/users',
  },
  Cuisines: {
    title: 'cuisines',
    icon: { FiGrid },
    to: '/cuisines',
  },
};
