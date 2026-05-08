import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Receipt,
  Users,
  Building,
  CreditCard,
  FileText,
  Filter
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { formatCurrency, cn } from '../../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MonthlyReports = () => {
  const [currentMonth, setCurrentMonth] = useState('May 2026');

  // Mock data for the specific monthly performance
  const dailyBurnData = [
    { day: '01', amount: 1200 }, { day: '05', amount: 3400 },
    { day: '10', amount: 800 }, { day: '15', amount: 15000 }, // Salary spike
    { day: '20', amount: 2100 }, { day: '25', amount: 1100 },
    { day: '30', amount: 1500 },
  ];

  const departmentBreakdown = [
    { name: 'Engineering', amount: 32000, change: '+4%', isIncrease: true },
    { name: 'Marketing', amount: 12500, change: '-2%', isIncrease: false },
    { name: 'Operations', amount: 8200, change: '+1%', isIncrease: true },
    { name: 'Sales', amount: 5400, change: '+0%', isIncrease: true },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
      {/* Month Navigation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <PageHeader 
            title="Monthly Report" 
            subtitle={`Detailed financial performance for the period of ${currentMonth}`}
          />
        </div>
        <div className="flex items-center gap-3 bg-card border border-border p-1.5 rounded-2xl shadow-sm">
          <Button variant="ghost" size="icon" className="rounded-xl"><ChevronLeft size={20} /></Button>
          <div className="px-4 flex items-center gap-2 font-black text-sm uppercase tracking-widest">
            <Calendar size={16} className="text-primary" /> {currentMonth}
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl"><ChevronRight size={20} /></Button>
        </div>
      </div>

      {/* Monthly KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Net Monthly Burn', val: '$58,100', icon: CreditCard, trend: '+5.2%' },
          { label: 'Operating Expenses', val: '$42,400', icon: Building, trend: '-1.1%' },
          { label: 'Payroll & Benefits', val: '$15,700', icon: Users, trend: '+0.0%' },
          { label: 'Uncategorized', val: '$450', icon: Receipt, trend: '-12%' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-border shadow-sm group hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-secondary rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black tracking-tight">{stat.val}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Spending Heatmap/Chart */}
        <div className="lg:col-span-2">
          <Card className="p-8 border-border shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" /> Daily Outflow Analytics
              </h3>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                <Filter size={14} /> Filter Anomalies
              </Button>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyBurnData}>
                  <defs>
                    <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
                  />
                  <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBurn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Departmental Change Sidebar */}
        <Card className="p-6 border-border shadow-sm">
          <h3 className="text-lg font-black tracking-tight mb-6">Departmental delta</h3>
          <div className="space-y-6">
            {departmentBreakdown.map((dept, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border group hover:bg-secondary transition-all">
                <div>
                  <p className="text-xs font-black uppercase text-muted-foreground tracking-tighter mb-1">{dept.name}</p>
                  <p className="text-lg font-black">{formatCurrency(dept.amount)}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                  dept.isIncrease ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                )}>
                  {dept.isIncrease ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {dept.change}
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-8 gap-2 rounded-xl py-6 font-black uppercase tracking-widest text-xs">
            <Download size={16} /> Download CSV Summary
          </Button>
        </Card>
      </div>

      {/* Audit Checklist Section */}
      <Card className="p-8 border-border shadow-sm border-l-4 border-l-primary">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl h-fit">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Month-End Reconciliation</h3>
              <p className="text-sm text-muted-foreground font-medium max-w-xl">
                All May 2026 expenses have been cross-referenced with manual bank statements. 
                Personnel costs have been verified against the current headcount of 14 members.
              </p>
            </div>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl gap-2 shadow-lg shadow-emerald-500/20">
            Verify & Lock Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MonthlyReports;