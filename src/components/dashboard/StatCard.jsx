import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const StatCard = ({ title, value, trend, trendType = "neutral", icon: Icon, description }) => {
  const isPositive = trendType === "positive";
  const isNegative = trendType === "negative";

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
          <Icon size={24} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-bold px-2 py-1 rounded-full",
            isPositive && "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
            isNegative && "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
            !isPositive && !isNegative && "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
          )}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
        {description && (
          <p className="text-xs text-slate-400 mt-2">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;