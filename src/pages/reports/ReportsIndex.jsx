import React, { useState } from 'react';
import { FileText, Download, Filter, Search, Calendar, CheckCircle2, Clock } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import StatusBadge from '../../components/common/StatusBadge';

const MOCK_REPORTS = [
  { id: 1, name: 'Q1 Financial Summary 2026', type: 'Executive', date: '2026-03-31', status: 'Ready', size: '2.4MB' },
  { id: 2, name: 'March Expense Audit', type: 'Compliance', date: '2026-04-05', status: 'Ready', size: '1.8MB' },
  { id: 3, name: 'Departmental Budget Utilization', type: 'Internal', date: '2026-04-10', status: 'Processing', size: '0.5MB' },
  { id: 4, name: 'Annual Tax Readiness 2025', type: 'Tax', date: '2026-01-15', status: 'Archived', size: '4.2MB' },
];

const ReportsIndex = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports" 
        subtitle="Access and generate financial statements and audit logs."
        action={
          <Button className="flex items-center gap-2">
            <Calendar size={18} /> Generate New Report
          </Button>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input className="pl-10" placeholder="Search reports..." />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="h-10 px-3 rounded-lg border dark:bg-slate-950 dark:border-slate-800 outline-none text-sm">
            <option>All Types</option>
            <option>Executive</option>
            <option>Compliance</option>
            <option>Tax</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={18} /> More Filters
          </Button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {MOCK_REPORTS.map((report) => (
          <Card key={report.id} className="hover:border-indigo-300 dark:hover:border-indigo-900 transition-colors">
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{report.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="uppercase font-bold tracking-tighter">{report.type}</span>
                    <span>•</span>
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-2">
                  {report.status === 'Processing' ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600 animate-pulse">
                      <Clock size={14} /> Processing
                    </span>
                  ) : (
                    <StatusBadge 
                      label={report.status} 
                      variant={report.status === 'Ready' ? 'success' : 'neutral'} 
                    />
                  )}
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-600 font-bold" disabled={report.status === 'Processing'}>
                  <Download size={18} className="mr-2" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsIndex;