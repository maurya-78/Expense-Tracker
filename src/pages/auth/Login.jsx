import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    setAuth(
      { name: "Founder User", email: data.email }, 
      "dummy-jwt-token-123"
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
        <p className="text-slate-500 text-sm">Enter your company credentials to access your workspace.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Company Email"
          type="email"
          placeholder="name@company.com"
          {...register('email', { required: true })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password', { required: true })}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base" 
          isLoading={isSubmitting}
        >
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-slate-500">
          Don't have an account? <span className="font-bold text-slate-900 cursor-pointer">Contact Sales</span>
        </p>
      </div>
    </div>
  );
};

export default Login;