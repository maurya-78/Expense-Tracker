import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Lock, 
  CheckCircle2, 
  Loader2, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  AlertCircle 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Retrieve token from URL: ?token=xyz
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    if (!token) return;
    
    setIsLoading(true);
    // Simulate API call to update password
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error("Reset failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If no token is present, show error state
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/20 p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-3xl shadow-xl border border-border text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold">Invalid Link</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            The password reset link is missing or has expired. Please request a new one.
          </p>
          <button 
            onClick={() => navigate('/forgot-password')}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold"
          >
            Go to Forgot Password
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card p-8 rounded-3xl shadow-2xl border border-border"
      >
        {!isSuccess ? (
          <>
            <div className="mb-8 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Set New Password</h1>
              <p className="text-muted-foreground mt-2">
                Secure your workspace with a new strong password.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 8, message: "At least 8 characters required" }
                    })}
                    type={showPassword ? "text" : "password"} 
                    className={cn(
                      "w-full pl-10 pr-12 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                      errors.password && "border-destructive"
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: (val) => val === password || "Passwords do not match"
                    })}
                    type="password" 
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                      errors.confirmPassword && "border-destructive"
                    )}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
              </div>

              {/* Password Requirements UI */}
              <div className="bg-secondary/50 p-4 rounded-xl space-y-2">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Security Requirements</p>
                <div className="flex items-center gap-2 text-xs">
                  <div className={cn("w-1.5 h-1.5 rounded-full", password.length >= 8 ? "bg-emerald-500" : "bg-slate-300")} />
                  <span className={password.length >= 8 ? "text-foreground" : "text-muted-foreground"}>Minimum 8 characters</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className={cn("w-1.5 h-1.5 rounded-full", /[A-Z]/.test(password) ? "bg-emerald-500" : "bg-slate-300")} />
                  <span className={/[A-Z]/.test(password) ? "text-foreground" : "text-muted-foreground"}>At least one uppercase letter</span>
                </div>
              </div>

              <button 
                disabled={isLoading}
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Password Updated</h2>
            <p className="text-muted-foreground mb-8">
              Your password has been reset successfully. Redirecting you to the login page...
            </p>
            <Loader2 className="animate-spin text-primary mx-auto" size={24} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;