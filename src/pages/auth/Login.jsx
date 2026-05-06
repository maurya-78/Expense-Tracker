import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { authSchema } from '../../lib/schemas';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FormField from '../../components/forms/FormField';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    try {
      // In production, this calls authService.login(data)
      await login(data); 
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Enter your credentials to access your company dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Business Email" error={errors.email?.message}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              {...register('email')}
              placeholder="name@company.com" 
              className="pl-10"
            />
          </div>
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              {...register('password')}
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className="pl-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FormField>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            Remember me
          </label>
          <Link to="/forgot-password" size="sm" className="text-sm font-bold text-indigo-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-indigo-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;