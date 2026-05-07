import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Landmark, Calendar, Info, Loader2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import BillUploader from '../../components/expenses/BillUploader';
import { useFinanceStore } from '../../store/useFinanceStore';

const AddExpense = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addExpense = useFinanceStore(state => state.addExpense);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    addExpense({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(data.amount)
    });
    setIsSubmitting(false);
    navigate('/expenses');
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Back to list
      </button>

      <PageHeader 
        title="New Expense" 
        subtitle="Enter expenditure details for reimbursement and tracking"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border shadow-sm space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Title / Vendor</label>
                <input 
                  {...register("title", { required: "Vendor name is required" })}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g. Amazon Web Services"
                />
                {errors.title && <p className="text-xs text-rose-500 font-bold">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Amount ($)</label>
                  <input 
                    type="number"
                    step="0.01"
                    {...register("amount", { required: "Amount is required", min: 0.01 })}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      type="date"
                      {...register("date", { required: true })}
                      className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                  <select 
                    {...register("category")}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none"
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Personnel">Personnel</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Assign to Team</label>
                  <select 
                    {...register("team")}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Growth">Growth</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Description (Optional)</label>
                <textarea 
                  {...register("description")}
                  rows={3}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  placeholder="Note about this spending..."
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-border shadow-sm bg-primary/5 border-primary/20">
            <h4 className="font-bold flex items-center gap-2 mb-4">
              <Landmark size={18} /> Payment Source
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-card border border-primary/20 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-tighter text-primary">Main Operating</p>
                  <p className="text-sm font-bold">SVB Checking **** 4290</p>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                * Available funds will be adjusted automatically upon submission.
              </p>
            </div>
          </Card>

          <BillUploader />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-6 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Save className="mr-2" /> Save Expense</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;