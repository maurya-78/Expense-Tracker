import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Filter, 
  Calendar, 
  ArrowUpRight, 
  MoreHorizontal 
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency } from '../../lib/utils';

const MonthlyReports = () => {
  const [selectedYear, setSelectedYear] = useState('2026');

  // Mock data for report archives
  const reports = [
    { id: 1, month: 'April', burn: 52000, savings: 4500, status: 'Generated', date: 'May 01, 2026' },
    { id: 2, month: 'March', burn: 48500, savings: 2100, status: 'Generated', date: 'Apr 01, 2026' },
    { id: 3, month: 'February', burn: 61000, savings: 0, status: 'Archived', date: 'Mar 01, 2026' },
    { id: 4, month: 'January', burn: 42000, savings: 8200, status: 'Archived', date: 'Feb 01, 2026' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Monthly Reports" 
        subtitle="Review and download certified monthly financial statements."
        action={
          <Button className="gap-2 shadow-lg shadow-indigo-500/20">
            <Calendar size={18} /> Generate May Report
          </Button>
        }
      />

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-indigo-600 border-none">
          <CardContent className="p-6 text-white">
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Avg. Monthly Burn</p>
            <h3 className="text-3xl font-bold mt-1">{formatCurrency(51200)}</h3>
            <div className="flex items-center gap-1 mt-4 text-xs font-medium text-indigo-200">
              <ArrowUpRight size={14} /> 4.2% from last year
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-lg font-bold">Audit Ready</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">All Q1 receipts verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Active Fiscal Year</CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-bold text-lg outline-none cursor-pointer"
            >
              <option value="2026">FY 2026</option>
              <option value="2025">FY 2025</option>
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Month</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Net Burn</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Efficiency Savings</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{report.month} Summary</p>
                        <p className="text-[10px] text-slate-400">Issued: {report.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-medium">{formatCurrency(report.burn)}</td>
                  <td className="p-4">
                    <span className={`text-sm font-bold ${report.savings > 0 ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {report.savings > 0 ? `+${formatCurrency(report.savings)}` : '--'}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusBadge 
                      label={report.status} 
                      variant={report.status === 'Generated' ? 'success' : 'secondary'} 
                    />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
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

export default MonthlyReports;