import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Users, 
  Target, 
  ShieldCheck, 
  Loader2,
  Info
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useTeamStore } from '../../store/useTeamStore';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const addTeam = useTeamStore(state => state.addTeam);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API logic
    await new Promise(r => setTimeout(r, 1500));
    
    addTeam({
      ...data,
      budget: parseFloat(data.budget),
      spending: 0,
      members: 0,
    });
    
    setIsLoading(false);
    navigate('/teams');
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <button 
        onClick={() => navigate('/teams')}
        className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Back to Departments
      </button>

      <PageHeader 
        title="Create New Team" 
        subtitle="Establish a new department and define its operational budget"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-8 border-border shadow-sm space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Team / Department Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("name", { required: "Department name is required" })}
                  className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g. Product Design"
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Department Lead</label>
                <input 
                  {...register("lead", { required: "Lead name is required" })}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Name of manager"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Monthly Budget ($)</label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="number"
                    {...register("budget", { required: "Budget is required", min: 0 })}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description & Purpose</label>
              <textarea 
                {...register("description")}
                rows={4}
                className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                placeholder="Describe the department's core responsibilities..."
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 flex gap-4">
          <Info className="text-amber-600 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
            Setting a budget here will trigger <strong>Smart Alerts</strong> once spending reaches 80% and 100% of the allocated amount. Ensure this aligns with your quarterly financial planning.
          </p>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/teams')} type="button">
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit" className="gap-2 px-8">
            {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Create Department</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;