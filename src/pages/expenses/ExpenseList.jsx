import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  ArrowUpDown,
  FileText,
  Calendar,
  Tag,
  Users
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { formatCurrency, cn } from '../../lib/utils';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useNavigate } from 'react-router-dom';

const ExpenseList = () => {
  const navigate = useNavigate();
  const { expenses, isLoading, fetchExpenses } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Filtering logic
  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader 
        title="Expenses" 
        subtitle="Detailed record of all company expenditures"
        action={
          <Button onClick={() => navigate('/expenses/add')} className="gap-2">
            <Plus size={18} /> Add Expense
          </Button>
        }
      />

      {/* Control Bar */}
      <Card className="p-4 border-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text"
            placeholder="Search by vendor or description..."
            className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="bg-secondary/50 border border-border rounded-xl px-4 py-2 text-sm font-medium outline-none"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Marketing">Marketing</option>
            <option value="SaaS">SaaS</option>
            <option value="Operations">Operations</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Download size={16} /> Export
          </Button>
        </div>
      </Card>

      {/* Expense Table */}
      <Card className="overflow-hidden border-border shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/30 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Team</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Amount</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredExpenses.map((expense) => (
                <motion.tr 
                  layout
                  key={expense.id} 
                  className="hover:bg-secondary/20 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/expenses/${expense.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 rounded-lg text-primary">
                        <FileText size={18} />
                      </div>
                      <span className="font-bold text-sm">{expense.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-secondary text-foreground border border-border">
                      <Tag size={10} /> {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={14} /> {expense.team}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-medium">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-black text-rose-500">
                      -{formatCurrency(expense.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreHorizontal size={18} className="text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredExpenses.length === 0 && !isLoading && (
          <div className="p-20 text-center">
            <div className="inline-flex p-6 bg-secondary rounded-full mb-4">
              <Search size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">No expenses found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExpenseList;