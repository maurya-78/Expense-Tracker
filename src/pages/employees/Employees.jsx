import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Mail, 
  MoreVertical, 
  Filter,
  DollarSign,
  Building2,
  Calendar
} from 'lucide-react';

import { Card } from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, formatDate } from '../../lib/utils';

// Mock Data
const MOCK_EMPLOYEES = [
  { id: '1', name: 'Rahul Sharma', role: 'Senior Engineer', dept: 'Engineering', salary: 180000, status: 'success', joinDate: '2024-01-15' },
  { id: '2', name: 'Sneha Gupta', role: 'Marketing Lead', dept: 'Marketing', salary: 120000, status: 'success', joinDate: '2024-03-10' },
  { id: '3', name: 'Ishaan Verma', role: 'Product Designer', dept: 'Design', salary: 95000, status: 'neutral', joinDate: '2025-06-20' },
  { id: '4', name: 'Ananya Iyer', role: 'Sales Executive', dept: 'Growth', salary: 85000, status: 'warning', joinDate: '2026-02-01' },
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Employees</h1>
          <p className="text-sm text-slate-500">Manage team members and payroll distribution.</p>
        </div>
        <Button className="gap-2">
          <UserPlus size={18} /> Add Employee
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Monthly Payroll</p>
            <p className="text-lg font-bold">{formatCurrency(480000)}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Departments</p>
            <p className="text-lg font-bold">6 Active</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Next Payday</p>
            <p className="text-lg font-bold">May 31, 2026</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={18} /> Filters
        </Button>
      </div>

      {/* Employee List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Monthly Salary</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Join Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600 text-xs">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{emp.name}</p>
                        <p className="text-xs text-slate-500">{emp.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {emp.dept}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    {formatCurrency(emp.salary)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge 
                      label={emp.status === 'success' ? 'Active' : emp.status === 'warning' ? 'On Leave' : 'Probation'} 
                      variant={emp.status} 
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDate(emp.joinDate)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Mail size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Employees;