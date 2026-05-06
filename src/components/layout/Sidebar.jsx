import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Receipt, Users, BarChart3, 
  Settings, UserCircle, LogOut, ChevronLeft 
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Expenses', path: '/expenses', icon: Receipt },
  { name: 'Teams', path: '/teams', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 lg:relative lg:translate-x-0",
      !isOpen && "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="text-xl font-bold text-white tracking-tight italic">FINANCE.IO</span>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400">
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn("transition-colors", "group-hover:text-indigo-400")} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section: Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user?.role}</p>
            </div>
          </div>
          
          <NavLink
            to="/settings"
            className="flex items-center space-x-3 px-4 py-2 text-sm hover:text-white transition-colors"
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
          
          <button 
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-rose-400 hover:text-rose-300 transition-colors mt-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;