import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import FormField from '../../components/forms/FormField';

const ReportGenerator = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Report Title">
              <Input placeholder="e.g., Monthly Burn Analysis - May 2026" />
            </FormField>
            <FormField label="Report Type">
              <select className="w-full h-10 px-3 rounded-lg border dark:bg-slate-950 dark:border-slate-800">
                <option>Detailed Expense Audit</option>
                <option>Executive Runway Summary</option>
                <option>Tax Preparation Export</option>
              </select>
            </FormField>
            <FormField label="Start Date">
              <Input type="date" />
            </FormField>
            <FormField label="End Date">
              <Input type="date" />
            </FormField>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Data Points to Include</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Burn Rate', 'Runway', 'Team Spend', 'Tax ID', 'Receipts', 'Employee Roles'].map((tag) => (
                <label key={tag} className="flex items-center gap-2 text-sm cursor-pointer p-2 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Button variant="outline">Preview</Button>
            <Button className="px-10">Generate PDF</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;