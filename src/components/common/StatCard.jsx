import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const StatCard = ({ title, value, trend, trendValue, icon: Icon }) => {
  const isPositive = trend === 'up';
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{value}</h3>
        </div>
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1">
        {isPositive ? <TrendingUp size={16} className="text-rose-500" /> : <TrendingDown size={16} className="text-emerald-500" />}
        <span className={cn("text-xs font-bold", isPositive ? "text-rose-500" : "text-emerald-500")}>
          {trendValue}%
        </span>
        <span className="text-xs text-slate-400 font-medium">vs last month</span>
      </div>
    </Card>
  );
};

export default StatCard;