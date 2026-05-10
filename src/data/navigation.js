import { 
  LayoutDashboard, 
  ReceiptIndianRupee, 
  BarChart3, 
  Users, 
  Settings 
} from 'lucide-react';

export const SIDEBAR_LINKS = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: ReceiptIndianRupee,
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Team Management',
    path: '/team',
    icon: Users,
    roles: ['admin', 'manager'], // Permission-based visibility
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];