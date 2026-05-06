import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Key, 
  Globe, 
  Bell,
  CheckCircle2,
  Lock
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FormField from '../../components/forms/FormField';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';

const ProfileSettings = () => {
  const { user } = useAuthStore();
  const addToast = useNotificationStore((state) => state.addToast);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        title: "Profile Updated",
        message: "Your changes have been saved successfully.",
        variant: "success"
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="Account Settings" 
        subtitle="Manage your personal information and security preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Navigation Sidebar (Mobile Friendly) */}
        <div className="space-y-1">
          {[
            { id: 'general', label: 'General', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'api', label: 'API Access', icon: Key },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                item.id === 'general' 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' 
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6 pb-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <User size={32} />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-indigo-600 shadow-sm">
                    <Camera size={14} />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Profile Picture</h4>
                  <p className="text-xs text-slate-500 mt-1">PNG or JPG, max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name">
                  <Input defaultValue={user?.name || "Jane Doe"} placeholder="Your name" />
                </FormField>
                <FormField label="Job Title">
                  <Input defaultValue="Founder / CEO" placeholder="Your role" />
                </FormField>
              </div>

              <FormField label="Email Address">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input 
                    defaultValue={user?.email || "jane@startup.io"} 
                    className="pl-10" 
                    readOnly
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  </div>
                </div>
              </FormField>

              <div className="pt-4 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Summary Section */}
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={18} className="text-indigo-500" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div>
                  <p className="text-sm font-bold">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div>
                  <p className="text-sm font-bold">Change Password</p>
                  <p className="text-xs text-slate-500">Last changed 3 months ago.</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </CardContent>
          </Card>

          {/* Language & Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={18} className="text-slate-400" />
                Regional Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField label="Timezone">
                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20">
                  <option>Pacific Standard Time (PST)</option>
                  <option>Eastern Standard Time (EST)</option>
                  <option>Greenwich Mean Time (GMT)</option>
                </select>
              </FormField>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;