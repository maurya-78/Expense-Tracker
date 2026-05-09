import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Building2, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun,
  ChevronRight,
  Save,
  Lock,
  Smartphone
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useThemeStore } from '../../store/useThemeStore';
import { cn } from '../../lib/utils';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'company', label: 'Company Info', icon: Building2 },
    { id: 'notifications', label: 'Alerts & Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: ShieldCheck },
    { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-[1200px] mx-auto space-y-8 pb-20">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your personal preferences and workspace configuration"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="p-8 border-border shadow-sm space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-border">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-xl">
                    AD
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Admin User</h3>
                    <p className="text-sm text-muted-foreground font-medium">Administrator • Since Jan 2024</p>
                    <Button variant="outline" size="sm" className="mt-2 text-xs font-bold h-8">Change Avatar</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                    <input className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                    <input className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" defaultValue="admin@stellar-ai.io" />
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-border shadow-sm">
                <h3 className="text-lg font-black mb-6">Appearance</h3>
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-card rounded-lg text-primary">
                      {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Dark Mode</p>
                      <p className="text-xs text-muted-foreground font-medium">Switch between light and dark interface</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleTheme}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      isDarkMode ? "bg-primary" : "bg-slate-300"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      isDarkMode ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="p-8 border-border shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black">Security Protocols</h3>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                    Strong Protection
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-2xl flex items-center justify-between group hover:bg-secondary/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg"><Lock size={20} /></div>
                      <div>
                        <p className="text-sm font-bold">Change Password</p>
                        <p className="text-xs text-muted-foreground font-medium">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </div>

                  <div className="p-4 border border-border rounded-2xl flex items-center justify-between group hover:bg-secondary/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg"><Smartphone size={20} /></div>
                      <div>
                        <p className="text-sm font-bold">Two-Factor Authentication</p>
                        <p className="text-xs text-emerald-500 font-bold uppercase tracking-tighter">Enabled</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="font-bold">Discard</Button>
            <Button className="gap-2 px-8 rounded-xl font-black shadow-lg shadow-primary/20">
              <Save size={18} /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;