import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';

import { Card } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, formatDate, truncate } from '../../lib/utils';

// Mock Data - Typically fetched via TanStack Query from your Express API
const MOCK_TRANSACTIONS = [
  { id: '1', title: 'AWS Server Costs', amount: 12500, category: 'Infrastructure', date: '2026-05-01', status: 'success', team: 'DevOps' },
  { id: '2', title: 'GitHub Enterprise', amount: 4200, category: 'SaaS', date: '2026-05-03', status: 'success', team: 'Engineering' },
  { id: '3', title: 'Office Rent - May', amount: 55000, category: 'Rent', date: '2026-05-05', status: 'warning', team: 'Operations' },
  { id: '4', title: 'Facebook Ads', amount: 8500, category: 'Marketing', date: '2026-05-08', status: 'danger', team: 'Growth' },
  { id: '5', title: 'Salaries - Engineering', amount: 450000, category: 'Payroll', date: '2026-05-10', status: 'success', team: 'Engineering' },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = MOCK_TRANSACTIONS.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Expenses & Transactions</h1>
          <p className="text-sm text-slate-500">View and manage all outgoing startup capital.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={16} /> Export CSV
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Add Expense
          </Button>
        </div>
      </div>

      {/* 2. Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by vendor or category..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="w-full md:w-auto gap-2">
              <Filter size={16} /> Categories
            </Button>
            <Button variant="outline" size="sm" className="w-full md:w-auto gap-2">
              <ArrowUpDown size={16} /> Sort By
            </Button>
          </div>
        </div>
      </Card>

      {/* 3. Transactions Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{truncate(item.title, 30)}</span>
                      <span className="text-xs text-slate-400">{item.team}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {formatCurrency(item.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDate(item.date)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge 
                      variant={item.status} 
                      label={item.status === 'success' ? 'Paid' : item.status === 'warning' ? 'Pending' : 'Overdue'} 
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">Showing {filteredTransactions.length} of {MOCK_TRANSACTIONS.length} results</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Transactions;