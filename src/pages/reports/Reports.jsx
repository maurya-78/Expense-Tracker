import React from 'react';
import { 
  FileText, 
  Download, 
  PieChart, 
  FileCheck, 
  ArrowRight,
  Filter,
  History
} from 'lucide-react';

import { Card, CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import FileUpload from '../../components/common/FileUpload';
import StatusBadge from '../../components/common/StatusBadge';
import { formatDate } from '../../lib/utils';

// Mock Data for Generated Reports
const GENERATED_REPORTS = [
  { id: '1', name: 'Monthly Burn Analysis - April 2026', type: 'PDF', date: '2026-05-01', status: 'success' },
  { id: '2', name: 'Quarterly Tax Statement (Q1)', type: 'Excel', date: '2026-04-15', status: 'success' },
  { id: '3', name: 'Departmental Budget Variance', type: 'PDF', date: '2026-04-01', status: 'info' },
  { id: '4', name: 'Annual Revenue Projection', type: 'Excel', date: '2026-03-20', status: 'success' },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & Compliance</h1>
          <p className="text-sm text-slate-500">Download financial statements and upload tax documents.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={18} /> Filter
          </Button>
          <Button className="gap-2">
            <PieChart size={18} /> Generate New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Upload Section (Compliance) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader 
              title="Upload Documents" 
              subtitle="Upload invoices or tax receipts for auditing" 
            />
            <CardContent>
              <FileUpload 
                onUploadComplete={(file) => console.log("Uploaded:", file)} 
                maxSizeMB={10} 
                accept=".pdf,.jpg,.png,.csv"
              />
              <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-start gap-3">
                <FileCheck className="text-indigo-600 mt-0.5" size={16} />
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  Documents uploaded here are automatically synced with your **Auditor View** for the current fiscal year.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Report Categories" />
            <CardContent className="space-y-2">
              {['Tax Compliance', 'Payroll Summaries', 'Investor Decks', 'Audit Logs'].map((cat) => (
                <button 
                  key={cat} 
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors">{cat}</span>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 3. Generated Reports Table */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader 
              title="Recent Generated Reports" 
              subtitle="Your system-generated financial exports" 
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Report Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {GENERATED_REPORTS.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 group-hover:text-indigo-600 transition-colors">
                            <FileText size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{report.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-500">{report.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{formatDate(report.date)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Download size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
                <History size={16} /> View Archive
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;