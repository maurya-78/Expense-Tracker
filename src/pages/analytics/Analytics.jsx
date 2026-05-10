import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, Legend 
} from 'recharts';
import { Download, Filter, TrendingUp, Calendar } from 'lucide-react';

import { Card, CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatCard from '../../components/common/StatCard';
import { CHART_COLORS, tooltipProps } from '../../lib/chart';
import { formatCurrency, formatCompactNumber } from '../../lib/utils';

// Mock Data - In production, fetch this from your MERN backend
const MOCK_DATA = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 38000 },
  { month: 'Mar', revenue: 48000, expenses: 42000 },
  { month: 'Apr', revenue: 61000, expenses: 40000 },
  { month: 'May', revenue: 55000, expenses: 45000 },
  { month: 'Jun', revenue: 67000, expenses: 48000 },
];

const CATEGORY_DATA = [
  { name: 'Cloud Services', value: 12000 },
  { name: 'Marketing', value: 8500 },
  { name: 'Salaries', value: 25000 },
  { name: 'Office Rent', value: 5000 },
];

const Analytics = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Can be linked to a ThemeStore later

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Analytics</h1>
          <p className="text-sm text-slate-500">Deep dive into your burn rate and revenue growth.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button size="sm" className="gap-2">
            <Download size={16} /> Export Report
          </Button>
        </div>
      </div>

      {/* 2. Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Avg. Monthly Burn" 
          value={formatCurrency(41000)} 
          trend="up" 
          trendValue={12} 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Revenue Growth" 
          value="+24%" 
          trend="down" 
          trendValue={5} 
          icon={TrendingUp} 
        />
        {/* Add more as needed */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Main Cash Flow Chart */}
        <Card className="lg:col-span-2">
          <CardHeader 
            title="Revenue vs Expenses" 
            subtitle="Comparing monthly inflows and outflows"
          />
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  tickFormatter={(value) => formatCompactNumber(value)}
                />
                <Tooltip {...tooltipProps(isDarkMode)} />
                <Legend iconType="circle" />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={CHART_COLORS.secondary} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke={CHART_COLORS.danger} 
                  fill="transparent" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4. Expense Breakdown */}
        <Card>
          <CardHeader title="Expense Breakdown" subtitle="By Top Categories" />
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  width={100}
                />
                <Tooltip cursor={{ fill: 'transparent' }} {...tooltipProps(isDarkMode)} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? CHART_COLORS.primary : CHART_COLORS.muted} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-slate-500 text-center font-medium">
                Largest expense: <span className="text-slate-900 font-bold">Salaries (₹25k)</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;