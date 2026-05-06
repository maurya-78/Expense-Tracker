import { cn } from '../../lib/utils';

const variants = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  danger: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800",
  info: "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800",
  neutral: "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800",
};

const StatusBadge = ({ label, variant = "neutral", className }) => {
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider",
      variants[variant],
      className
    )}>
      {label}
    </span>
  );
};

export default StatusBadge;