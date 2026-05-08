import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FilePlus2, 
  Settings2, 
  Eye, 
  Download, 
  CheckCircle2, 
  Layout, 
  BarChart4, 
  PieChart, 
  Table as TableIcon,
  RefreshCw,
  X,
  FileText
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';

const ReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedMetrics, setSelectedMetrics] = useState(['burn_rate']);

  const metrics = [
    { id: 'burn_rate', label: 'Gross Burn Rate', icon: BarChart4, desc: 'Total monthly cash outflow' },
    { id: 'runway', label: 'Runway Projection', icon: Layout, desc: 'Estimated months of capital' },
    { id: 'dept_spend', label: 'Dept. Breakdown', icon: PieChart, desc: 'Spending by organization unit' },
    { id: 'cash_flow', label: 'Net Cash Flow', icon: TableIcon, desc: 'Inflow vs Outflow reconciliation' },
  ];

  const toggleMetric = (id) => {
    setSelectedMetrics(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate complex report compilation logic
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8 pb-20">
      <PageHeader 
        title="Report Generator" 
        subtitle="Configure and compile custom board-ready financial documents"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { s: 1, label: 'Configuration' },
          { s: 2, label: 'Visual Style' },
          { s: 3, label: 'Export' }
        ].map((item) => (
          <div key={item.s} className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all",
              step >= item.s ? "bg-primary text-white" : "bg-secondary text-muted-foreground border border-border"
            )}>
              {step > item.s ? <CheckCircle2 size={16} /> : item.s}
            </div>
            <span className={cn(
              "text-xs font-black uppercase tracking-widest",
              step === item.s ? "text-foreground" : "text-muted-foreground"
            )}>{item.label}</span>
            {item.s < 3 && <div className="h-px bg-border flex-1 mx-2" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="p-8 border-border shadow-sm">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <Settings2 size={20} className="text-primary" /> Select Primary Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics.map((m) => (
                  <div 
                    key={m.id}
                    onClick={() => toggleMetric(m.id)}
                    className={cn(
                      "p-5 rounded-2xl border-2 transition-all cursor-pointer group",
                      selectedMetrics.includes(m.id) 
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10" 
                        : "border-border hover:border-primary/40 bg-card"
                    )}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={cn(
                        "p-2 rounded-xl transition-colors",
                        selectedMetrics.includes(m.id) ? "bg-primary text-white" : "bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-white"
                      )}>
                        <m.icon size={20} />
                      </div>
                      {selectedMetrics.includes(m.id) && <CheckCircle2 size={18} className="text-primary" />}
                    </div>
                    <p className="font-black text-sm mb-1">{m.label}</p>
                    <p className="text-xs text-muted-foreground font-medium">{m.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} className="gap-2 px-8 py-6 rounded-2xl font-black uppercase tracking-widest text-xs">
                Next: Design Options <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="p-8 border-border shadow-sm">
              <h3 className="text-lg font-black mb-6">Visual Theme</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Executive Summary', 'Detailed Audit', 'Board Presentation'].map((style) => (
                  <div key={style} className="aspect-[3/4] rounded-2xl border-2 border-border p-4 bg-secondary/20 flex flex-col justify-end hover:border-primary transition-all cursor-pointer group">
                    <div className="w-full h-1 bg-slate-300 rounded mb-1 group-hover:bg-primary transition-colors" />
                    <div className="w-2/3 h-1 bg-slate-300 rounded mb-4" />
                    <p className="font-bold text-xs">{style}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={() => setStep(1)} className="font-bold">Back</Button>
              <Button 
                disabled={isGenerating}
                onClick={handleGenerate}
                className="gap-2 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : "Generate Report"}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText size={40} />
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Report Ready</h2>
            <p className="text-muted-foreground font-medium mb-10">Your customized board deck has been compiled and is ready for download.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gap-2 px-8 py-6 rounded-2xl font-black shadow-lg shadow-primary/20">
                <Download size={20} /> Download PDF
              </Button>
              <Button variant="outline" onClick={() => setStep(1)} className="px-8 py-6 rounded-2xl font-black">
                Create Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportGenerator;