import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API logic
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setAuth({ 
        id: '1', 
        name: 'Alex Rivera', 
        email: data.email, 
        company: 'Stellar AI' 
      }, 'mock-jwt-token-xyz');
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white mb-12">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <span className="font-bold text-2xl">$</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">FinVantage</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Precision finance <br /> for hyper-growth.
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-md">
              Track burn rate, manage runway, and empower your team with 
              real-time financial visibility.
            </p>
          </motion.div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center gap-4 text-white/60 text-sm">
          <span>© 2026 FinVantage Inc.</span>
          <span>•</span>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Sign In</h2>
            <p className="text-muted-foreground">
              Enter your company credentials to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                  className={cn(
                    "w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    errors.email && "border-destructive focus:ring-destructive/20"
                  )}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  {...register("password", { required: "Password is required" })}
                  type={showPassword ? "text" : "password"} 
                  className={cn(
                    "w-full pl-10 pr-12 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    errors.password && "border-destructive focus:ring-destructive/20"
                  )}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Enter Workspace <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account? {' '}
              <a href="#" className="text-primary font-bold hover:underline">Contact Sales</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;