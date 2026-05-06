import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FormField from '../../components/forms/FormField';
import authService from '../../services/authService';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Reset request failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600">
            <CheckCircle2 size={48} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Check your email</h2>
          <p className="text-slate-500">
            We've sent a password reset link to your email address.
          </p>
        </div>
        <Link to="/login">
          <Button variant="outline" className="w-full mt-4">Back to login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white pt-4">
          Reset password
        </h2>
        <p className="text-slate-500">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Email Address" error={errors.email?.message}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              {...register('email', { required: "Email is required" })}
              placeholder="name@company.com" 
              className="pl-10"
              type="email"
            />
          </div>
        </FormField>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;