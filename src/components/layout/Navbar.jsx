import { useState } from 'react';
import { Search, Bell, Sun, Moon, Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 lg:px-8 transition-colors duration-300">
      <div className="h-full flex items-center justify-between">
        
        {/* Mobile Toggle - FIXED: Visible on Mobile, Hidden on Desktop (lg and up) */}
        <div className="flex items-center gap-4 lg:hidden"> 
          <button 
            onClick={onMenuClick}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Search Bar (Desktop) - Hidden on mobile, visible on md and up */}
        <div className="hidden md:flex items-center bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 w-96 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search size={18} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="bg-transparent border-none outline-none text-sm w-full dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-2">
          {/* Runway Stats - Hidden on mobile/tablet, visible only on large desktop */}
          <div className="hidden xl:block text-right mr-4 border-r border-slate-200 dark:border-slate-800 pr-6">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Est. Runway</p>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">14.2 Months</p>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
          </div>
          
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
          
          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 pl-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
            >
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                  {user?.name || 'Jane Doe'}
                </p>
                <p className="text-[10px] text-slate-500 font-medium capitalize mt-1">
                  {user?.role || 'Founder'}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0) || 'J'}
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-20 py-2 animate-in fade-in zoom-in duration-200">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2" />
                  <button 
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 w-full transition"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;