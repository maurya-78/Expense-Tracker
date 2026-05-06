import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, DollarSign, Calendar, Tag, Users } from 'lucide-react';
import FormField from './FormField';
import FileUpload from '../common/FileUpload';

const expenseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number",
  }),
  category: z.string().min(1, "Please select a category"),
  team: z.string().min(1, "Please assign a team"),
  date: z.string().min(1, "Transaction date is required"),
  notes: z.string().max(200, "Notes are too long").optional(),
});

const ExpenseForm = ({ onSubmit, isLoading, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialData || {
      date: new Date().toISOString().split('T')[0],
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Expense Title" error={errors.title?.message}>
          <input
            {...register('title')}
            placeholder="e.g., AWS Monthly Infrastructure"
            className="w-full px-3 py-2 rounded-lg border dark:bg-slate-900 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField label="Amount" error={errors.amount?.message}>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              {...register('amount')}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full pl-9 pr-3 py-2 rounded-lg border dark:bg-slate-900 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </FormField>

        <FormField label="Category" error={errors.category?.message}>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              {...register('category')}
              className="w-full pl-9 pr-3 py-2 rounded-lg border dark:bg-slate-900 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white dark:bg-slate-900"
            >
              <option value="">Select Category</option>
              <option value="SaaS">SaaS Subscriptions</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Marketing">Marketing/Ads</option>
              <option value="Operations">Operations/Rent</option>
            </select>
          </div>
        </FormField>

        <FormField label="Team" error={errors.team?.message}>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              {...register('team')}
              className="w-full pl-9 pr-3 py-2 rounded-lg border dark:bg-slate-900 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white dark:bg-slate-900"
            >
              <option value="">Assign to Team</option>
              <option value="Engineering">Engineering</option>
              <option value="Growth">Growth</option>
              <option value="Product">Product</option>
            </select>
          </div>
        </FormField>
      </div>

      <FormField label="Receipt / Invoice">
        <FileUpload onFileSelect={(file) => console.log('File attached:', file)} />
        <FileUpload onUploadComplete={(file) => setReceipt(file)} />
      </FormField>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {initialData ? "Update Expense" : "Create Expense"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;