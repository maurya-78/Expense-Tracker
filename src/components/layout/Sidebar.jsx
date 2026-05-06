import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Receipt, Users, BarChart3, 
  Settings, LogOut, ChevronLeft 
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

// Paths MUST match exactly what you defined in AppRoutes.jsx
const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard }, // Changed from /dashboard to /
  { name: 'Expenses', path: '/expenses', icon: Receipt },
  { name: 'Teams', path: '/teams', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings }, // Moved into main nav for consistency
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {/* Mobile Overlay - Closes sidebar when clicking outside on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">F</div>
              <span className="text-xl font-bold text-white tracking-tight uppercase">Finance.io</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                // end property prevents "/" from matching everything
                end={item.path === '/'} 
                className={({ isActive }) => cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "hover:bg-slate-800/50 hover:text-white text-slate-400"
                )}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Section: Profile & Logout */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center space-x-3 px-3 py-3 mb-2 rounded-xl bg-slate-800/30">
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-500 truncate capitalize tracking-wider font-semibold">
                  {user?.role || 'Admin'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-400/5 rounded-lg transition-all mt-1"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;