import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  Flame,
  Hourglass,
  Users,
  Plus,
  TrendingUp,
} from 'lucide-react';

// Layout & UI Components
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';

// Specific Dashboard Components
import StatCard from '../../components/dashboard/StatCard';
import RunwayProgress from '../../components/dashboard/RunwayProgress';
import RecentActivity from '../../components/dashboard/RecentActivity';
import SmartInsights from '../../components/dashboard/SmartInsights';

// Charts
import AreaTrendChart from '../../components/charts/AreaTrendChart';
import CategoryPieChart from '../../components/charts/CategoryPieChart';

// State & Utils
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../lib/utils';

const Dashboard = () => {
  // Access Zustand Store
  const { 
    expenses, 
    totalBalance, 
    fetchExpenses, 
    isLoading 
  } = useFinanceStore();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Mock Data for Visualization (In production, move to useAnalytics hook)
  const trendData = [
    { name: 'Jan', burn: 45000 },
    { name: 'Feb', burn: 52000 },
    { name: 'Mar', burn: 48000 },
    { name: 'Apr', burn: 61000 },
    { name: 'May', burn: 55000 },
  ];

  const categoryData = [
    { name: 'Infrastructure', value: 12500 },
    { name: 'SaaS', value: 8400 },
    { name: 'Marketing', value: 15000 },
    { name: 'Operations', value: 19100 },
  ];

  const insights = [
    {
      type: 'warning',
      text: 'Cloud costs increased by 18% this month.',
    },
    {
      type: 'tip',
      text: 'Annual billing can reduce SaaS costs by up to 20%.',
    },
  ];

  // Logic: Get top 5 most recent transactions
  const recentTransactions = Array.isArray(expenses) 
    ? [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5) 
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 min-w-0 pb-10"
    >
      {/* Platform Header */}
      <PageHeader
        title="Dashboard"
        subtitle="Real-time financial health and runway overview"
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Plus size={18} />
            New Expense
          </Button>
        }
      />

      {/* KPI Section: High-level financial metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Balance"
          value={formatCurrency(totalBalance)}
          icon={Wallet}
          trend="+4.2%"
          trendType="positive"
          delay={0.1}
        />
        <StatCard
          title="Monthly Burn"
          value={formatCurrency(55000)}
          icon={Flame}
          trend="+12%"
          trendType="negative"
          delay={0.2}
        />
        <StatCard
          title="Est. Runway"
          value="14.2 Months"
          icon={Hourglass}
          trend="Stable"
          trendType="neutral"
          delay={0.3}
        />
        <StatCard
          title="Active Teams"
          value="8"
          icon={Users}
          trend="+1"
          trendType="positive"
          delay={0.4}
        />
      </div>

      {/* Main Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Trend Visualization */}
        <Card className="lg:col-span-2 overflow-hidden border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="text-xl font-bold">Spending Trend</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Monthly cash outflow analysis
              </p>
            </div>
            <div className="p-2 bg-secondary rounded-lg">
              <TrendingUp size={20} className="text-primary" />
            </div>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[350px] w-full">
              <AreaTrendChart
                data={trendData}
                dataKey="burn"
                color="hsl(var(--primary))"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actionable Sidebar: Runway & Future Scaling (AI Placeholders) */}
        <div className="space-y-6">
          <RunwayProgress months={14.2} totalGoal={24} />
          <SmartInsights insights={insights} />
        </div>
      </div>

      {/* Distribution & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expenditure Breakdown */}
        <Card className="overflow-hidden border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <CategoryPieChart data={categoryData} />
            </div>
          </CardContent>
        </Card>

        {/* Transaction History Log */}
        <div className="lg:col-span-2">
          <RecentActivity 
            transactions={recentTransactions} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;