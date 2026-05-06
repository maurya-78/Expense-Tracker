import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, Search, Mail, Briefcase, 
  MoreVertical, Filter, Download 
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import DataTable from '../../components/tables/DataTable';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { formatCurrency } from '../../lib/utils';

const MOCK_EMPLOYEES = [
  { id: 1, name: 'Alex Rivera', role: 'Senior Engineer', team: 'Engineering', salary: 125000, status: 'Active', email: 'alex@startup.io' },
  { id: 2, name: 'Sarah Chen', role: 'Product Manager', team: 'Product', salary: 110000, status: 'Active', email: 'sarah@startup.io' },
  { id: 3, name: 'Mike Johnson', role: 'Growth Lead', team: 'Marketing', salary: 95000, status: 'On Leave', email: 'mike@startup.io' },
  { id: 4, name: 'Elena Rodriguez', role: 'Finance Analyst', team: 'Finance', salary: 85000, status: 'Active', email: 'elena@startup.io' },
];

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      header: "Employee",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "Role & Team",
      cell: (row) => (
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{row.role}</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{row.team}</p>
        </div>
      )
    },
    {
      header: "Salary",
      cell: (row) => (
        <span className="font-mono font-semibold">
          {formatCurrency(row.salary)}
          <span className="text-[10px] text-slate-400 ml-1">/yr</span>
        </span>
      )
    },
    {
      header: "Status",
      cell: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      )
    },
    {
      header: "",
      cell: () => (
        <Button variant="ghost" size="icon">
          <MoreVertical size={16} className="text-slate-400" />
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employees" 
        subtitle="Manage your workforce, team assignments, and payroll."
        action={
          <Button className="gap-2">
            <UserPlus size={20} /> Add Employee
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 font-medium">Total Headcount</p>
          <h3 className="text-3xl font-bold mt-1">24</h3>
          <p className="text-xs text-emerald-500 font-bold mt-2">+2 from last month</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 font-medium">Monthly Payroll</p>
          <h3 className="text-3xl font-bold mt-1">{formatCurrency(185000)}</h3>
          <p className="text-xs text-slate-400 font-bold mt-2">Next pay date: May 30</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 font-medium">Avg. Salary</p>
          <h3 className="text-3xl font-bold mt-1">{formatCurrency(92000)}</h3>
          <p className="text-xs text-indigo-500 font-bold mt-2">Within market range</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            className="pl-10 h-11" 
            placeholder="Search by name, role, or team..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="gap-2 h-11 px-4">
            <Filter size={18} /> Filters
          </Button>
          <Button variant="outline" className="h-11 px-4">
            <Download size={18} />
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <DataTable columns={columns} data={MOCK_EMPLOYEES} />
    </div>
  );
};

export default EmployeeList;