import { ShoppingBag, Coffee, Zap, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

const ActivityIcon = ({ category }) => {
  switch (category) {
    case 'Infrastructure': return <Zap size={16} />;
    case 'SaaS': return <ShoppingBag size={16} />;
    case 'Travel': return <CreditCard size={16} />;
    default: return <Coffee size={16} />;
  }
};

const RecentActivity = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
        <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                <ActivityIcon category={tx.category} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{tx.title}</p>
                <p className="text-xs text-slate-500">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                -{formatCurrency(tx.amount)}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{tx.team}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;