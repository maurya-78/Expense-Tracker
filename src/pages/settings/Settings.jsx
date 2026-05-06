import React from 'react';
import { User, Building, Bell, Shield, CreditCard } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import ProfileSettings from './Profile';
import CompanySettings from './Company';
import NotificationSettings from './Notifications';

const Settings = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your personal preferences and company configuration." 
      />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} /> Profile
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building size={16} /> Company
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <ProfileSettings />
        </TabsContent>
        
        <TabsContent value="company" className="mt-0">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <Shield size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold">Security Module</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">
              Password management and 2FA settings are being migrated to the new security layer.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;