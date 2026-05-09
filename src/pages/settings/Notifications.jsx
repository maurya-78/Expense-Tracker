import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Flame, 
  Timer, 
  Target, 
  Mail, 
  Smartphone, 
  Zap,
  Save,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const Notifications = () => {
  const [alerts, setAlerts] = useState({
    runway_warning: true,
    burn_spike: true,
    budget_exceeded: true,
    weekly_digest: false,
    email_notif: true,
    push_notif: false
  });

  const toggleAlert = (id) => {
    setAlerts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const alertConfigs = [
    {
      id: 'runway_warning',
      title: 'Low Runway Alert',
      desc: 'Notify when estimated runway drops below 6 months.',
      icon: Timer,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    },
    {
      id: 'burn_spike',
      title: 'Burn Rate Spike',
      desc: 'Alert if monthly burn increases by more than 15%.',
      icon: Flame,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      id: 'budget_exceeded',
      title: 'Department Budget Overrun',
      desc: 'Immediate alert when a team exceeds its monthly allocation.',
      icon: Target,
      color: 'text-primary',
      bg: 'bg-primary/10'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <Card className="p-8 border-border shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 text-primary rounded-xl">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Smart Financial Alerts</h3>
            <p className="text-sm text-muted-foreground font-medium">Configure automated monitoring for your startup runway</p>
          </div>
        </div>

        <div className="space-y-4">
          {alertConfigs.map((config) => (
            <div 
              key={config.id}
              className={cn(
                "p-5 rounded-2xl border transition-all flex items-center justify-between group",
                alerts[config.id] ? "border-primary/20 bg-primary/5" : "border-border bg-card hover:bg-secondary/30"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", config.bg, config.color)}>
                  <config.icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">{config.title}</p>
                  <p className="text-xs text-muted-foreground font-medium">{config.desc}</p>
                </div>
              </div>
              
              <button 
                onClick={() => toggleAlert(config.id)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  alerts[config.id] ? "bg-primary" : "bg-slate-300"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  alerts[config.id] ? "left-7" : "left-1"
                )} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-border shadow-sm">
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <Mail size={16} /> Channel Preferences
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Email Notifications</span>
              <input 
                type="checkbox" 
                checked={alerts.email_notif} 
                onChange={() => toggleAlert('email_notif')}
                className="w-5 h-5 rounded-md border-border text-primary focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Push Notifications</span>
              <input 
                type="checkbox" 
                checked={alerts.push_notif} 
                onChange={() => toggleAlert('push_notif')}
                className="w-5 h-5 rounded-md border-border text-primary focus:ring-primary"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm bg-slate-900 text-white border-none relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-amber-500" size={18} />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Critical Alerting</h4>
            </div>
            <p className="text-sm font-bold mb-2">Multi-channel Redundancy</p>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Critical runway warnings (under 3 months) bypass all mute settings and are sent via Email, Push, and SMS to all Company Admins.
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="gap-2 px-10 py-6 rounded-2xl font-black shadow-xl shadow-primary/20">
          <Save size={18} /> Update Alert Logic
        </Button>
      </div>
    </div>
  );
};

export default Notifications;