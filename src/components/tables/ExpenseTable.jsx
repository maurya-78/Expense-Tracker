import { MoreHorizontal, FileText, ExternalLink } from "lucide-react";
import DataTable from "./DataTable";
import StatusBadge from "../common/StatusBadge";
import { formatCurrency } from "../../lib/utils";

const ExpenseTable = ({ expenses, onEdit }) => {
  const columns = [
    {
      header: "Description",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
            <FileText size={18} />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{row.title}</p>
            <p className="text-xs text-slate-500">{row.category}</p>
          </div>
        </div>
      ),
    },
    { header: "Team", accessor: "team" },
    {
      header: "Amount",
      cell: (row) => (
        <span className="font-mono font-bold text-slate-900 dark:text-white">
          {formatCurrency(row.amount)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <StatusBadge 
          label={row.status} 
          variant={row.status === 'Paid' ? 'success' : 'warning'} 
        />
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition">
            <ExternalLink size={16} className="text-slate-400" />
          </button>
          <button onClick={() => onEdit(row)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition">
            <MoreHorizontal size={16} className="text-slate-400" />
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={expenses} />;
};

export default ExpenseTable;