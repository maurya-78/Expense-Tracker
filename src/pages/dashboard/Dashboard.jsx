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

import PageHeader from '../../components/layout/PageHeader';
import StatCard from '../../components/dashboard/StatCard';
import AreaTrendChart from '../../components/charts/AreaTrendChart';
import CategoryPieChart from '../../components/charts/CategoryPieChart';
import RunwayProgress from '../../components/dashboard/RunwayProgress';
import RecentActivity from '../../components/dashboard/RecentActivity';
import SmartInsights from '../../components/dashboard/SmartInsights';

import { Button } from '../../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';

import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../lib/utils';

const Dashboard = () => {
  // Safe Store Access
  const financeStore = useFinanceStore?.() || {};

  const expenses = financeStore.expenses || [];
  const totalBalance = financeStore.totalBalance || 0;
  const fetchExpenses = financeStore.fetchExpenses || (() => {});
  const isLoading = financeStore.isLoading || false;

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Mock Data
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
      text: 'Annual billing can reduce SaaS costs.',
    },
  ];

  // Safe Slice
  const recentTransactions = (expenses || []).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PageHeader
        title="Dashboard"
        subtitle="Financial health overview"
        action={
          <Button className="gap-2">
            <Plus size={18} />
            New Expense
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Balance"
          value={formatCurrency(totalBalance)}
          icon={Wallet}
          trend="+4.2%"
          trendType="positive"
        />

        <StatCard
          title="Monthly Burn"
          value={formatCurrency(55000)}
          icon={Flame}
          trend="+12%"
          trendType="negative"
        />

        <StatCard
          title="Est. Runway"
          value="14.2 Months"
          icon={Hourglass}
          trend="Stable"
          trendType="neutral"
        />

        <StatCard
          title="Active Teams"
          value="8"
          icon={Users}
          trend="+1"
          trendType="positive"
        />
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Spending Trend</CardTitle>

              <p className="text-sm text-slate-500 mt-1">
                Cash outflow overview
              </p>
            </div>

            <TrendingUp
              size={20}
              className="text-slate-400"
            />
          </CardHeader>

          <CardContent>
            <AreaTrendChart
              data={trendData}
              dataKey="burn"
              color="#6366f1"
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <RunwayProgress months={14} />

          <SmartInsights insights={insights} />
        </div>
      </div>

      {/* Secondary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Category Distribution
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CategoryPieChart data={categoryData} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <RecentActivity
            transactions={recentTransactions}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;