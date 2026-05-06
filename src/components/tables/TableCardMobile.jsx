import { formatCurrency } from "../../lib/utils";
import StatusBadge from "../common/StatusBadge";

const TableCardMobile = ({ item }) => {
  return (
    <div className="md:hidden bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-3 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
          <p className="text-xs text-slate-500">{item.date} • {item.category}</p>
        </div>
        <p className="font-bold text-indigo-600">{formatCurrency(item.amount)}</p>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.team}</span>
        <StatusBadge label={item.status} variant={item.status === 'Paid' ? 'success' : 'warning'} />
      </div>
    </div>
  );
};

export default TableCardMobile;