import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Globe, DollarSign, Landmark, ShieldCheck } from 'lucide-react';

const CompanySettings = () => {
  return (
    <div className="space-y-6">
      <Card className="p-8 border-border shadow-sm space-y-6">
        <h3 className="text-lg font-black flex items-center gap-2">
          <Globe size={20} className="text-primary" /> Global Finance Logic
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Functional Currency</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <select className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none appearance-none font-bold">
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Fiscal Year Start</label>
            <select className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none appearance-none font-bold">
              <option value="jan">January</option>
              <option value="apr">April</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-border shadow-sm">
        <h3 className="text-lg font-black mb-6 flex items-center gap-2">
          <Landmark size={20} className="text-primary" /> Tax & Compliance
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tax Identification Number (TIN)</label>
            <input 
              className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl outline-none font-mono" 
              placeholder="XX-XXXXXXX"
            />
          </div>
        </div>
      </Card>

      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex gap-4">
        <ShieldCheck className="text-primary shrink-0" size={24} />
        <div>
          <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-1">Audit Protocol</h4>
          <p className="text-xs text-muted-foreground leading-relaxed font-medium">
            Changes to company-wide financial settings are logged in the <strong>Audit Trail</strong> and will require a secondary admin confirmation if the amount exceeds $10k.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;