import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Trash2, Edit3, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency } from '../../lib/utils';

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for demonstration
  const expense = {
    title: "AWS Monthly Infrastructure",
    amount: 1450.20,
    date: "March 24, 2026",
    category: "Infrastructure",
    team: "Engineering",
    addedBy: "Alex Rivera",
    status: "Paid",
    receiptUrl: "https://example.com/receipt.pdf"
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm"
      >
        <ArrowLeft size={16} /> Back to Expenses
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{expense.title}</h1>
            <StatusBadge label={expense.status} variant="success" />
          </div>
          <p className="text-slate-500 font-medium">Transaction ID: EXP-{id?.toUpperCase()}</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2">
            <Edit3 size={18} /> Edit
          </Button>
          <Button variant="destructive" className="flex-1 md:flex-none gap-2">
            <Trash2 size={18} /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Details */}
        <Card className="lg:col-span-2">
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(expense.amount)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{expense.date}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Category</p>
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-bold">
                  {expense.category}
                </span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Team</p>
                <p className="font-bold">{expense.team}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Added By</p>
                <p className="font-bold">{expense.addedBy}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-start gap-3">
              <ShieldCheck className="text-emerald-500 mt-0.5" size={18} />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                This transaction has been verified against the bank statement and is cleared for the Q1 report.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Preview Sidepanel */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Receipt Attachment</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download size={16} />
              </Button>
            </div>
            <div className="aspect-[3/4] w-full bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center p-6 transition-all hover:border-indigo-400 group">
              <FileText size={48} className="text-slate-300 group-hover:text-indigo-400 transition-colors mb-4" />
              <p className="text-sm font-bold text-slate-500">receipt_aws_march.pdf</p>
              <p className="text-xs text-slate-400 mt-1">Uploaded 2 days ago</p>
              <Button variant="link" className="mt-4 text-indigo-600">View Fullscreen</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseDetail;