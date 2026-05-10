import React, { useState } from 'react';
import { Rocket, Building2, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Onboarding = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= i ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                {step > i ? <CheckCircle2 size={16} /> : i}
              </div>
              {i < 3 && <div className={`w-16 md:w-24 h-1 mx-2 rounded ${step > i ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Rocket className="text-indigo-600" /> Welcome to Stellar
              </h2>
              <p className="text-slate-500">Let's start with your company name.</p>
            </div>
            <Input label="Company Name" placeholder="e.g. Acme Corp" />
            <Button className="w-full gap-2" onClick={() => setStep(2)}>
              Next Step <ArrowRight size={18} />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="text-indigo-600" /> Business Details
              </h2>
              <p className="text-slate-500">What's your primary industry?</p>
            </div>
            <Input label="Industry" placeholder="e.g. Software, Manufacturing" />
            <Button className="w-full gap-2" onClick={() => setStep(3)}>
              Next Step <ArrowRight size={18} />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 text-center">
            <div className="py-4 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold">You're all set!</h2>
              <p className="text-slate-500 max-w-sm">Your financial dashboard is ready. Let's start tracking your startup's growth.</p>
            </div>
            <Button className="w-full" onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;