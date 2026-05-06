import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FormField from '../../components/forms/FormField';
import authService from '../../services/authService';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.resetPassword(token, data.password);
      // Show success toast here
      navigate('/login');
    } catch (error) {
      console.error("Reset failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="inline-flex p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 mb-2">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Set new password
        </h2>
        <p className="text-slate-500">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="New Password" error={errors.password?.message}>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              {...register('password', { 
                required: "Password is required",
                minLength: { value: 8, message: "Must be at least 8 characters" }
              })}
              type="password"
              placeholder="••••••••" 
              className="pl-10"
            />
          </div>
        </FormField>

        <FormField label="Confirm Password" error={errors.confirmPassword?.message}>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              {...register('confirmPassword', { 
                validate: value => value === password || "Passwords do not match"
              })}
              type="password"
              placeholder="••••••••" 
              className="pl-10"
            />
          </div>
        </FormField>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;