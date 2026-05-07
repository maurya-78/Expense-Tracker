import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  ChevronRight, 
  Loader2, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API logic for Workspace + Admin User creation
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // In production, this would be an Axios call to /api/auth/register
      const mockUser = { 
        id: 'admin_01', 
        name: data.fullName, 
        email: data.email, 
        company: data.companyName,
        role: 'Owner'
      };
      const mockToken = 'new-workspace-jwt-token';
      
      setAuth(mockUser, mockToken);
      navigate('/onboarding'); // Direct to company setup flow
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Panel: Value Proposition */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-950 relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/login" className="flex items-center gap-2 text-white mb-16">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="font-bold text-2xl">$</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">FinVantage</span>
          </Link>
          
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white leading-tight"
            >
              Start managing your <br />
              <span className="text-primary">startup runway</span> better.
            </motion.h1>

            <ul className="space-y-4">
              {[
                "Real-time burn rate tracking",
                "Automated runway calculations",
                "Departmental budget management",
                "Enterprise-grade security"
              ].map((text, i) => (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex items-center gap-3 text-slate-400"
                >
                  <CheckCircle2 className="text-primary" size={20} />
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          <p className="text-white italic">
            "FinVantage transformed how we track our Series A funding. We saved 15+ hours a month on manual spreadsheets."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700" />
            <div>
              <p className="text-white font-bold text-sm">Sarah Jenkins</p>
              <p className="text-slate-500 text-xs">CFO, CloudScale AI</p>
            </div>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Right Panel: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8 py-12"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Create Workspace</h2>
            <p className="text-muted-foreground">
              Register your company to begin financial tracking.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Company Details */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("companyName", { required: "Company name is required" })}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                      errors.companyName && "border-destructive"
                    )}
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("fullName", { required: "Full name is required" })}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("email", { 
                      required: "Work email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                    })}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="john@acme.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum 8 characters" }
                    })}
                    type="password"
                    className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
              <ShieldCheck className="text-primary shrink-0" size={18} />
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                By creating a workspace, you agree to our <strong>Terms of Service</strong>. This will be the primary administrative account for your company.
              </p>
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Create Company Workspace <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have a workspace? {' '}
              <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;