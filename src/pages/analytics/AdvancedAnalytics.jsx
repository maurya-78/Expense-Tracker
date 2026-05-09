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
  Target,
  BrainCircuit,
  Scaling
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { 
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { formatCurrency, cn } from '../../lib/utils';

const AdvanceAnalytics = () => {
  const [isSimulating, setIsSimulating] = useState(false);

  // Advanced data: Correlation between Headcount and Infrastructure Spend
  const correlationData = [
    { x: 10, y: 2500, z: 200, name: 'Jan' },
    { x: 12, y: 3000, z: 240, name: 'Feb' },
    { x: 15, y: 5200, z: 300, name: 'Mar' }, // Spike in spend per head
    { x: 17, y: 4800, z: 340, name: 'Apr' },
    { x: 20, y: 5900, z: 400, name: 'May' },
  ];

  const velocityData = [
    { month: 'Jan', velocity: 1200, acceleration: 2 },
    { month: 'Feb', velocity: 1400, acceleration: 5 },
    { month: 'Mar', velocity: 2100, acceleration: 15 },
    { month: 'Apr', velocity: 1800, acceleration: -8 },
    { month: 'May', velocity: 1700, acceleration: -2 },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
      <PageHeader 
        title="Advanced Analytics" 
        subtitle="Multi-dimensional financial modeling and capital velocity tracking"
        action={
          <Button 
            onClick={() => {
                setIsSimulating(true);
                setTimeout(() => setIsSimulating(false), 2000);
            }}
            className="gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
          >
            {isSimulating ? <RefreshCcw className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
            Run Simulation
          </Button>
        }
      />

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 border-border shadow-sm bg-primary/5 border-primary/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary text-white rounded-lg">
                <Scaling size={20} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-primary">Capital Velocity</h4>
            </div>
            <p className="text-3xl font-black mb-1">$4,820 <span className="text-xs text-muted-foreground font-bold">/ DAY</span></p>
            <p className="text-xs text-muted-foreground font-medium">The speed at which your capital is being deployed into operations.</p>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        </Card>

        <Card className="p-6 border-border shadow-sm bg-emerald-500/5 border-emerald-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-500">Efficiency Index</h4>
          </div>
          <p className="text-3xl font-black mb-1">0.92 <span className="text-xs text-muted-foreground font-bold">SCORE</span></p>
          <p className="text-xs text-muted-foreground font-medium">Measurement of output value vs. capital burned.</p>
        </Card>

        <Card className="p-6 border-border shadow-sm bg-rose-500/5 border-rose-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-rose-500 text-white rounded-lg">
              <Zap size={20} />
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-rose-500">Anomaly Rating</h4>
          </div>
          <p className="text-3xl font-black mb-1">Low <span className="text-xs text-muted-foreground font-bold">RISK</span></p>
          <p className="text-xs text-muted-foreground font-medium">Current variance is within 5% of projected financial models.</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Velocity Chart */}
        <Card className="p-8 border-border shadow-sm">
          <h3 className="text-lg font-black mb-2">Spending Acceleration</h3>
          <p className="text-xs text-muted-foreground font-medium mb-8">Tracking the rate of change in your monthly burn</p>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="velocity" fill="#3b82f6" fillOpacity={0.1} stroke="#3b82f6" strokeWidth={3} />
                <Bar dataKey="acceleration" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Correlation Chart */}
        <Card className="p-8 border-border shadow-sm">
          <h3 className="text-lg font-black mb-2">Headcount Correlation</h3>
          <p className="text-xs text-muted-foreground font-medium mb-8">Relationship between team size (X) and infra-spend (Y)</p>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" dataKey="x" name="Team Size" unit=" ppl" axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="y" name="Spend" unit="$" axisLine={false} tickLine={false} />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Volume" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Teams" data={correlationData} fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Predictive Models Table */}
      <Card className="overflow-hidden border-border shadow-sm">
        <div className="p-6 border-b border-border bg-secondary/20">
          <h3 className="font-black text-sm uppercase tracking-widest">Growth Scenario Simulations</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-card border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <tr>
                        <th className="px-6 py-4">Scenario</th>
                        <th className="px-6 py-4">Projected Burn</th>
                        <th className="px-6 py-4">Runway Impact</th>
                        <th className="px-6 py-4">Risk Level</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {[
                        { s: 'Aggressive Hiring (+5/mo)', b: '$85,000', r: '-4.2 Months', risk: 'High', color: 'text-rose-500' },
                        { s: 'Infrastructure Optimization', b: '$42,000', r: '+1.8 Months', risk: 'Low', color: 'text-emerald-500' },
                        { s: 'Current Trajectory', b: '$51,200', r: 'Stable', risk: 'Medium', color: 'text-amber-500' },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors cursor-default font-bold text-sm">
                            <td className="px-6 py-4">{row.s}</td>
                            <td className="px-6 py-4">{row.b}</td>
                            <td className={cn("px-6 py-4", row.color)}>{row.r}</td>
                            <td className="px-6 py-4">
                                <span className={cn("px-2 py-1 rounded-lg text-[10px] uppercase", 
                                    row.risk === 'High' ? "bg-rose-100 text-rose-600" : 
                                    row.risk === 'Low' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600")}>
                                    {row.risk}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default AdvanceAnalytics;