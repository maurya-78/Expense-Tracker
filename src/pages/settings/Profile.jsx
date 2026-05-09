import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Camera, 
  MapPin, 
  Briefcase, 
  Shield, 
  CheckCircle2, 
  Loader2,
  Save,
  Trash2
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';

const Profile = () => {
  const { user } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user?.name || 'Admin User',
      email: user?.email || 'admin@startup.com',
      role: user?.role || 'Company Administrator',
      location: 'San Francisco, CA',
    }
  });

  const onSubmit = async (data) => {
    setIsUpdating(true);
    // Simulate API update
    await new Promise(r => setTimeout(r, 1500));
    setIsUpdating(false);
    // In production, sync with useAuthStore or a Toast notification
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Profile Identity Card */}
        <Card className="p-8 border-border shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-indigo-600" />
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-28 h-28 bg-gradient-to-br from-primary to-blue-700 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl transition-transform group-hover:scale-105 duration-300">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <button 
                type="button" 
                className="absolute -bottom-2 -right-2 p-2.5 bg-card border border-border rounded-xl shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Camera size={18} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h2 className="text-2xl font-black tracking-tight">Personal Identity</h2>
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <p className="text-muted-foreground font-medium text-sm">
                Manage your public-facing information and company credentials.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  Global Admin
                </span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-lg text-[10px] font-black uppercase tracking-widest border border-border">
                  Verified Entity
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Input Grid */}
        <Card className="p-8 border-border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("fullName", { required: "Name is required" })}
                  className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
              {errors.fullName && <p className="text-xs text-rose-500 font-bold">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Position / Role</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("role")}
                  className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("location")}
                  className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Security Summary Widget */}
        <Card className="p-6 border-border shadow-sm border-l-4 border-l-emerald-500 bg-emerald-500/5">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <Shield size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black uppercase tracking-tight text-emerald-600 mb-1">Account Security</h4>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Your profile is protected by <strong>Two-Factor Authentication</strong> and global login monitoring. Ensure your work email remains accessible to receive security tokens.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-emerald-600 hover:bg-emerald-500/10">
              Manage Security
            </Button>
          </div>
        </Card>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4">
          <button 
            type="button" 
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors"
          >
            <Trash2 size={16} /> Deactivate Account
          </button>
          
          <div className="flex gap-3">
            <Button variant="outline" className="px-8 rounded-xl font-black uppercase tracking-widest text-xs">
              Discard
            </Button>
            <Button 
              disabled={isUpdating}
              type="submit" 
              className="gap-2 px-10 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
            >
              {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Save Identity</>}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Profile;