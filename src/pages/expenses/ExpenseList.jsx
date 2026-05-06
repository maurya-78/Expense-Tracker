import React, { useState } from 'react';
import { Plus, Search, Filter, Download, FileText, MoreHorizontal, Eye } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import ExpenseTable from '../../components/tables/ExpenseTable';
import TableControls from '../../components/tables/TableControls';
import ExpenseModal from '../../components/modals/ExpenseModal';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useFinanceStore } from '../../store/useFinanceStore';

const ExpenseList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { expenses, isLoading } = useFinanceStore();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Expense Management" 
        subtitle="Track, categorize, and audit your company spending."
        action={
          <Button onClick={() => setModalOpen(true)} className="gap-2">
            <Plus size={20} /> Add Expense
          </Button>
        }
      />

      {/* Advanced Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            className="pl-10 h-11" 
            placeholder="Search by vendor, title, or reference..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select className="h-11 px-3 rounded-lg border bg-transparent dark:border-slate-800 outline-none text-sm font-medium">
          <option>All Categories</option>
          <option>Infrastructure</option>
          <option>SaaS</option>
          <option>Marketing</option>
          <option>Operations</option>
        </select>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 h-11 gap-2">
            <Filter size={18} /> Filters
          </Button>
          <Button variant="outline" className="h-11 px-3" title="Export CSV">
            <Download size={18} />
          </Button>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <ExpenseTable 
          expenses={expenses} 
          isLoading={isLoading} 
          onEdit={(expense) => console.log("Editing:", expense)}
        />
        
        {/* Footer with Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <TableControls currentPage={1} totalPages={5} onPageChange={(p) => console.log(p)} />
        </div>
      </div>

      {/* Slide-over/Modal for Adding Expenses */}
      <ExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        mode="create"
      />
    </div>
  );
};

export default ExpenseList;