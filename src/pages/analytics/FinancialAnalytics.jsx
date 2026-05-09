import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Maximize2,
  RefreshCcw,
  Target
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ComposedChart,
  Bar
} from 'recharts';
import { formatCurrency } from '../../lib/utils';

const FinancialAnalytics = () => {
  const [timeRange, setTimeRange] = useState('6M');

  // Multi-dimensional mock data
  const performanceData = [
    { month: 'Jan', burn: 42000, efficiency: 82, budget: 45000 },
    { month: 'Feb', burn: 38000, efficiency: 88, budget: 45000 },
    { month: 'Mar', burn: 51000, efficiency: 74, budget: 45000 }, // Spike
    { month: 'Apr', burn: 46000, efficiency: 80, budget: 48000 },
    { month: 'May', burn: 44000, efficiency: 85, budget: 48000 },
    { month: 'Jun', burn: 41000, efficiency: 91, budget: 48000 },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
      <PageHeader 
        title="Predictive Analytics" 
        subtitle="Deep-cycle analysis of capital velocity and operational efficiency"
        action={
          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border">
            {['1M', '3M', '6M', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                  timeRange === range ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        }
      />

      {/* Real-time Velocity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-border shadow-sm border-b-4 border-b-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl">
              <Activity size={20} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <ArrowDownRight size={12} /> -4.2% VOLATILITY
            </span>
          </div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Burn Velocity</p>
          <h3 className="text-2xl font-black">$1,420 <span className="text-sm text-muted-foreground">/ day</span></h3>
        </Card>

        <Card className="p-6 border-border shadow-sm border-b-4 border-b-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-500/10 text-purple-600 rounded-xl">
              <Zap size={20} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} /> +12% INDEX
            </span>
          </div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Capital Efficiency</p>
          <h3 className="text-2xl font-black">0.88 <span className="text-sm text-muted-foreground">SCORE</span></h3>
        </Card>

        <Card className="p-6 border-border shadow-sm border-b-4 border-b-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <Target size={20} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-black text-rose-500 bg-rose-500/10 px-2 py-1 rounded-full">
              <TrendingUp size={12} /> +$4k DELTA
            </span>
          </div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Budget Variance</p>
          <h3 className="text-2xl font-black">+$2,400 <span className="text-sm text-muted-foreground">OVERAGE</span></h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Burn vs. Efficiency Mixed Chart */}
        <div className="lg:col-span-2">
          <Card className="p-8 border-border shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black tracking-tight">Performance Correlation</h3>
                <p className="text-sm text-muted-foreground font-medium">Analyzing the relationship between burn and output efficiency</p>
              </div>
              <Button variant="outline" size="icon" className="rounded-xl"><Maximize2 size={18} /></Button>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                  <Bar yAxisId="left" dataKey="burn" name="Gross Burn" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency Score" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                  <Line yAxisId="left" type="step" dataKey="budget" name="Budget Limit" stroke="#f43f5e" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Predictive Side Module */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-md bg-slate-950 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <RefreshCcw size={12} className="animate-spin-slow" /> Anomaly Detection
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-rose-400 mb-1">Infrastructure Spike</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Unusual 15% increase in AWS Lambda usage detected in <span className="text-white">Engineering</span> between May 12-15.
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-emerald-400 mb-1">SaaS Optimization</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    4 dormant Adobe Creative Cloud licenses identified. Potential savings: <span className="text-white">$340/mo</span>.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
          </Card>

          <Card className="p-6 border-border shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart3 size={16} className="text-primary" /> Sector Weighting
            </h4>
            <div className="space-y-5">
              {[
                { label: 'Personnel', val: 65, color: 'bg-blue-500' },
                { label: 'Software', val: 22, color: 'bg-purple-500' },
                { label: 'Cloud', val: 8, color: 'bg-emerald-500' },
                { label: 'Marketing', val: 5, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      className={cn("h-full rounded-full", item.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10 rounded-xl">
              View Detailed Heatmap
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalytics;