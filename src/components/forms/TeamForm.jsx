import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'; // 'z' is defined here
import { Loader2, Users, DollarSign, UserCheck } from 'lucide-react';
import FormField from './FormField';
import { cn } from '../../lib/utils';

// 1. Schema Definition
const teamSchema = z.object({
  name: z.string().min(2, "Team name must be at least 2 characters"),
  budget: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, "Budget must be a positive number"),
  lead: z.string().min(1, "Please select a team lead"),
});

const TeamForm = ({ onSubmit, onCancel, isLoading, initialData }) => {
  // 2. Form Hook Initialization
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: initialData || {
      name: '',
      budget: '',
      lead: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Team Name Input */}
      <FormField label="Department Name" error={errors.name?.message}>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            {...register('name')}
            className={cn(
              "w-full pl-10 pr-3 py-2 rounded-lg border bg-white dark:bg-slate-900 outline-none focus:ring-2 transition-all",
              errors.name ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
            )}
            placeholder="e.g., Engineering"
          />
        </div>
      </FormField>

      {/* Monthly Budget Input */}
      <FormField label="Monthly Budget Limit" error={errors.budget?.message}>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            {...register('budget')}
            type="number"
            step="0.01"
            className={cn(
              "w-full pl-10 pr-3 py-2 rounded-lg border bg-white dark:bg-slate-900 outline-none focus:ring-2 transition-all font-mono",
              errors.budget ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
            )}
            placeholder="50000"
          />
        </div>
      </FormField>

      {/* Team Lead Selection (Added from Schema) */}
      <FormField label="Team Lead" error={errors.lead?.message}>
        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            {...register('lead')}
            className={cn(
              "w-full pl-10 pr-3 py-2 rounded-lg border bg-white dark:bg-slate-900 outline-none focus:ring-2 transition-all appearance-none",
              errors.lead ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
            )}
          >
            <option value="">Select a lead...</option>
            <option value="jane-doe">Jane Doe (CEO)</option>
            <option value="john-smith">John Smith (CTO)</option>
            <option value="sarah-connor">Sarah Connor (COO)</option>
          </select>
        </div>
      </FormField>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex-[2] py-2.5 px-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-indigo-500/10"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Processing...
            </>
          ) : (
            initialData ? "Update Team" : "Initialize Team"
          )}
        </button>
      </div>
    </form>
  );
};

export default TeamForm;