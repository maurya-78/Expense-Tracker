import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FormField from '../../components/forms/FormField';

const CompanySettings = () => {
  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Legal Company Name">
              <Input defaultValue="StartupX Inc." />
            </FormField>
            <FormField label="Tax ID / EIN">
              <Input defaultValue="12-3456789" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Base Currency">
              <select className="w-full h-10 px-3 rounded-lg border dark:bg-slate-950 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </FormField>
            <FormField label="Fiscal Year Start">
              <select className="w-full h-10 px-3 rounded-lg border dark:bg-slate-950 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="1">January</option>
                <option value="4">April</option>
              </select>
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-rose-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-rose-100 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-900/10 rounded-xl">
            <div>
              <p className="font-bold text-rose-900 dark:text-rose-200">Archive Company Data</p>
              <p className="text-xs text-rose-700 dark:text-rose-300">Permanently delete all financial records and team data.</p>
            </div>
            <Button variant="destructive" size="sm">Delete Data</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button className="px-8">Save Changes</Button>
      </div>
    </div>
  );
};

export default CompanySettings;