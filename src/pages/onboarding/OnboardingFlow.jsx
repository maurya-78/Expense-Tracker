import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Wallet, 
  Users, 
  ChevronRight, 
  Check, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Technology',
    initialBalance: '',
    bankName: '',
    firstTeam: ''
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = [
    { id: 1, title: 'Workspace', icon: Building2 },
    { id: 2, title: 'Treasury', icon: Wallet },
    { id: 3, title: 'Structure', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center py-12 px-4">
      {/* Progress Header */}
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                step >= s.id ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white text-slate-400 border-2 border-slate-200"
              )}>
                {step > s.id ? <Check size={20} /> : <s.icon size={20} />}
              </div>
              <span className={cn(
                "mt-2 text-[10px] font-black uppercase tracking-widest",
                step >= s.id ? "text-primary" : "text-slate-400"
              )}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {/* Step 1: Company Profile */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black tracking-tight mb-2">Build your workspace</h1>
                <p className="text-muted-foreground font-medium">Let's start with the basics of your startup.</p>
              </div>

              <Card className="p-8 border-border shadow-sm space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Legal Company Name</label>
                  <input 
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g. Stellar AI Inc."
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Industry Sector</label>
                  <select className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none appearance-none font-bold">
                    <option>SaaS / Technology</option>
                    <option>Fintech</option>
                    <option>Healthcare</option>
                    <option>E-commerce</option>
                  </select>
                </div>
              </Card>

              <Button onClick={nextStep} className="w-full py-7 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 gap-2">
                Continue <ChevronRight size={20} />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Financial Foundation */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black tracking-tight mb-2">Treasury Setup</h1>
                <p className="text-muted-foreground font-medium">Set your initial operating balance to track runway.</p>
              </div>

              <Card className="p-8 border-border shadow-sm space-y-6">
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex gap-3 mb-4">
                  <ShieldCheck className="text-amber-600 shrink-0" size={20} />
                  <p className="text-[11px] text-amber-800 font-medium">
                    This is a manual tracking setup. We will not connect to your bank API during this onboarding.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Operating Bank Name</label>
                  <div className="relative">
                    <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="e.g. SVB or Mercury"
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Current Balance (USD)</label>
                  <input 
                    type="number"
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-2xl font-black"
                    placeholder="0.00"
                    value={formData.initialBalance}
                    onChange={(e) => setFormData({...formData, initialBalance: e.target.value})}
                  />
                </div>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={prevStep} className="flex-1 py-7 rounded-2xl font-black">
                  <ArrowLeft size={18} className="mr-2" /> Back
                </Button>
                <Button onClick={nextStep} className="flex-[2] py-7 rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Organizational Structure */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black tracking-tight mb-2">Define Structure</h1>
                <p className="text-muted-foreground font-medium">Create your first department to assign expenses.</p>
              </div>

              <Card className="p-8 border-border shadow-sm space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-primary">Quick Select</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Engineering', 'Marketing', 'Product', 'Operations'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setFormData({...formData, firstTeam: t})}
                        className={cn(
                          "py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all",
                          formData.firstTeam === t ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Custom Department Name</label>
                  <input 
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="e.g. R&D"
                    value={formData.firstTeam}
                    onChange={(e) => setFormData({...formData, firstTeam: e.target.value})}
                  />
                </div>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={prevStep} className="flex-1 py-7 rounded-2xl font-black">
                  Back
                </Button>
                <Button 
                  onClick={() => navigate('/')} 
                  className="flex-[2] py-7 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 bg-emerald-600 hover:bg-emerald-700 border-none"
                >
                  Launch Workspace <Sparkles size={20} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;