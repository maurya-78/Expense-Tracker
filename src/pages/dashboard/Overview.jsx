import React from 'react';
import { TrendingUp, Users, CreditCard, Wallet } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import { formatCurrency } from '../../lib/utils';

const Overview = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening with your runway.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Balance" 
          value={formatCurrency(1250000)} 
          icon={Wallet} 
          trend="up" 
          trendValue={12} 
        />
        <StatCard 
          title="Monthly Burn" 
          value={formatCurrency(45000)} 
          icon={TrendingUp} 
          trend="down" 
          trendValue={3} 
        />
        <StatCard 
          title="Total Employees" 
          value="24" 
          icon={Users} 
        />
        <StatCard 
          title="Active Cards" 
          value="8" 
          icon={CreditCard} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex items-center justify-center">
          <p className="text-slate-400 italic">Chart: Monthly Cash Flow coming soon...</p>
        </div>
        <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex items-center justify-center">
          <p className="text-slate-400 italic">List: Recent Transactions coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;