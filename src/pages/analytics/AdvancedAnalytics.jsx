import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingDown, 
  Download, 
  Calendar,
  Filter
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Legend 
} from 'recharts';

const MOCK_BURN_DATA = [
  { month: 'Jan', projected: 45000, actual: 42000 },
  { month: 'Feb', projected: 45000, actual: 48000 },
  { month: 'Mar', projected: 50000, actual: 49000 },
  { month: 'Apr', projected: 50000, actual: 62000 }, // Variance alert
  { month: 'May', projected: 55000, actual: 54000 },
];

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Advanced Analytics" 
        subtitle="Deep dive into spending patterns and financial forecasting."
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar size={18} /> {timeRange === '6m' ? 'Last 6 Months' : 'Year to Date'}
            </Button>
            <Button className="gap-2">
              <Download size={18} /> Export Data
            </Button>
          </div>
        }
      />

      {/* Forecasting Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-600" />
              Actual vs. Budgeted Burn
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_BURN_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="projected" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Budgeted" />
                <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} name="Actual Spend" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Runway Sensitivity Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Runway Sensitivity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 mb-2">IF BURN DECREASES 10%</p>
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-bold text-emerald-600">16.4 Months</h3>
                <span className="text-xs font-medium text-emerald-500 mb-1">+2.2 months</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 mb-2">IF BURN INCREASES 10%</p>
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-bold text-rose-600">11.8 Months</h3>
                <span className="text-xs font-medium text-rose-500 mb-1">-2.4 months</span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xs text-slate-500 italic">
                *Sensitivity is calculated based on current cash balance and trailing 3-month average burn.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown & Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending Velocity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_BURN_DATA}>
                <defs>
                  <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" hide />
                <Tooltip />
                <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBurn)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficiency Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {[
               { label: 'Engineering Cost per Head', value: '$10.4k', change: '+2%', type: 'neutral' },
               { label: 'Marketing ROI (Est)', value: '3.2x', change: '+0.4x', type: 'positive' },
               { label: 'SaaS Tool Bloat', value: '14 Tools', change: '-2', type: 'positive' },
             ].map((insight, idx) => (
               <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-lg">
                 <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{insight.label}</span>
                 <div className="text-right">
                   <p className="font-bold">{insight.value}</p>
                   <p className={`text-[10px] font-bold ${insight.type === 'positive' ? 'text-emerald-500' : 'text-slate-400'}`}>
                     {insight.change}
                   </p>
                 </div>
               </div>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;