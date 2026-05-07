import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Download, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  ShieldAlert,
  FileText,
  User,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, cn } from '../../lib/utils';

const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, deleteExpense } = useFinanceStore();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const found = expenses.find(e => e.id === id);
    if (found) {
      setExpense(found);
    }
  }, [id, expenses]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense? This will restore the balance to the linked bank account.")) {
      deleteExpense(id);
      navigate('/expenses');
    }
  };

  if (!expense) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-secondary rounded-full" />
        <p className="text-muted-foreground font-bold">Loading transaction details...</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/expenses')}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} /> Back to Expenses
        </button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/expenses/edit/${id}`)} className="gap-2">
            <Edit3 size={16} /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-2">
            <Trash2 size={16} /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-border shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
               <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Reconciled
               </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Building size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{expense.title}</h1>
                <p className="text-muted-foreground font-medium">{expense.category} • Transaction ID: {expense.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Amount</p>
                <p className="text-2xl font-black text-rose-500">-{formatCurrency(expense.amount)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Date</p>
                <p className="text-lg font-bold flex items-center gap-2">
                  <Calendar size={18} className="text-muted-foreground" /> {expense.date}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Team</p>
                <p className="text-lg font-bold flex items-center gap-2">
                  <User size={18} className="text-muted-foreground" /> {expense.team}
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-secondary/30 rounded-2xl border border-border">
              <h4 className="text-sm font-bold mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                {expense.description || "No additional notes provided for this transaction."}
              </p>
            </div>
          </Card>

          {/* Document Preview Placeholder */}
          <Card className="p-6 border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <FileText size={18} /> Attached Document
              </h3>
              <Button variant="ghost" size="sm" className="text-primary gap-2">
                <Download size={14} /> Download
              </Button>
            </div>
            <div className="aspect-video bg-secondary/50 rounded-xl border-2 border-dashed border-border flex items-center justify-center group cursor-pointer hover:bg-secondary transition-all">
              <div className="text-center">
                <ExternalLink className="mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium text-muted-foreground">Click to preview receipt.pdf</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Audit Trail Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-sm bg-slate-900 text-white">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
              <Clock size={14} /> Audit History
            </h4>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full border-4 border-slate-900" />
                <p className="text-xs font-bold">Transaction Created</p>
                <p className="text-[10px] text-slate-500 font-medium">By Admin • May 07, 2026</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900" />
                <p className="text-xs font-bold">Funds Deducted</p>
                <p className="text-[10px] text-slate-500 font-medium">From SVB Operating • May 07, 2026</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-4 h-4 bg-slate-700 rounded-full border-4 border-slate-900" />
                <p className="text-xs font-bold">Receipt Attached</p>
                <p className="text-[10px] text-slate-500 font-medium">System Auto-process • May 07, 2026</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border shadow-sm border-l-4 border-l-amber-500">
            <div className="flex gap-4">
              <ShieldAlert className="text-amber-500 shrink-0" />
              <div>
                <h4 className="text-sm font-bold mb-1">Compliance Check</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This transaction matches your company's spending policy for <strong>Cloud Infrastructure</strong>. No further action required.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetails;