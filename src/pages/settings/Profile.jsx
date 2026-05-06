import React, { useState } from 'react';
import { 
  User, Mail, Shield, Camera, Key, 
  Globe, Bell, CheckCircle2, Lock 
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
  const [activeTab, setActiveTab] = useState('general');
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header Section - Positioned Verbatim as per image_840873.png */}
      <div className="px-2">
        <PageHeader 
          title="Account Settings" 
          subtitle="Manage your personal information and security preferences."
        />
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Column: Sticky Navigation Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-1">
          {[
            { id: 'general', label: 'General', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'api', label: 'API Access', icon: Key },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Right Column: Dynamic Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* General Tab Content */}
          {activeTab === 'general' && (
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="border-b border-slate-50 dark:border-slate-800/50 pb-4">
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Profile Picture Upload Section */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700">
                      <User size={40} />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Profile Photo</h4>
                    <p className="text-xs text-slate-500 mt-1">PNG or JPG, max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Full Name">
                    <Input defaultValue={user?.name || "Jane Doe"} className="h-11" />
                  </FormField>
                  <FormField label="Job Title">
                    <Input defaultValue="Founder / CEO" className="h-11" />
                  </FormField>
                </div>

                <FormField label="Email Address">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      defaultValue={user?.email || "jane@finance.io"} 
                      className="pl-12 h-11" 
                      readOnly 
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                      <CheckCircle2 size={14} /> Verified
                    </div>
                  </div>
                </FormField>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="px-8 h-11 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20"
                  >
                    {isSaving ? "Saving..." : "Save All Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Tab Content */}
          {activeTab === 'security' && (
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="h-1 bg-indigo-600 w-full" />
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock size={18} className="text-indigo-600" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-bold">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Secure your account with MFA.</p>
                  </div>
                  <Button variant="outline" className="rounded-xl">Setup</Button>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;