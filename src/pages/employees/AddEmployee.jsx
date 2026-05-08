import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail, 
  Briefcase, 
  DollarSign, 
  Calendar,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    console.log("Adding employee:", data);
    setIsLoading(false);
    navigate('/employees');
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => navigate('/employees')}
        className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Back to Directory
      </button>

      <PageHeader 
        title="Add Team Member" 
        subtitle="Invite a new member and configure their employment financial details"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-border shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b border-border pb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("name", { required: "Name is required" })}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Jane Cooper"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Role / Position</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("role", { required: "Role is required" })}
                  className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="e.g. Lead Software Engineer"
                />
              </div>
            </div>
          </Card>

          <Card className="p-8 border-border shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b border-border pb-4">Employment & Salary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Department</label>
                <select 
                  {...register("team")}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none transition-all"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Product">Product</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Employment Type</label>
                <select 
                  {...register("type")}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none transition-all"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Monthly Salary ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="number"
                    {...register("salary", { required: "Salary is required" })}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="10000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Joining Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="date"
                    {...register("joinDate")}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-sm bg-primary/5 border-primary/20">
            <h4 className="font-bold flex items-center gap-2 mb-4 text-primary">
              <ShieldCheck size={18} /> Compliance Note
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Adding a new employee will automatically update the <strong>Monthly Burn Rate</strong> and project a new <strong>Runway</strong> duration based on current capital.
            </p>
          </Card>

          <Button 
            disabled={isLoading}
            type="submit" 
            className="w-full py-6 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Onboard Member</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;