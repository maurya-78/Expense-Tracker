import { Bell, AlertTriangle, TrendingUp, Info, Check } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '../ui/popover';
import { cn } from '../../lib/utils';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'warning',
    title: 'Low Runway Alert',
    message: 'Your current runway is projected to end in 4.2 months. Consider reducing expenses.',
    time: '2h ago',
    unread: true,
    icon: AlertTriangle,
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
  },
  {
    id: 2,
    type: 'trend',
    title: 'Spending Spike',
    message: 'Engineering spend increased by 15% compared to last month.',
    time: '5h ago',
    unread: true,
    icon: TrendingUp,
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
  },
  {
    id: 3,
    type: 'info',
    title: 'Report Generated',
    message: 'The monthly financial summary for April 2026 is ready for download.',
    time: '1d ago',
    unread: false,
    icon: Info,
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
  }
];

const NotificationCenter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl" align="end">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
          <button className="text-xs text-indigo-600 font-bold hover:underline">Mark all as read</button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {NOTIFICATIONS.length > 0 ? (
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {NOTIFICATIONS.map((n) => (
                <div 
                  key={n.id} 
                  className={cn(
                    "p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer",
                    n.unread && "bg-indigo-50/30 dark:bg-indigo-900/10"
                  )}
                >
                  <div className={cn("shrink-0 p-2 h-9 w-9 rounded-lg flex items-center justify-center", n.color)}>
                    <n.icon size={18} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-500 leading-snug">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {n.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-500">No new notifications</p>
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <button className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">
            View All Alerts
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;