import React from 'react';
import { 
  Users, 
  Briefcase, 
  Plus, 
  MoreHorizontal, 
  TrendingUp, 
  Target 
} from 'lucide-react';

import { Card, CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatCard from '../../components/common/StatCard';
import { formatCurrency, cn } from '../../lib/utils';

// Mock data for Departments/Teams
const MOCK_TEAMS = [
  { 
    id: '1', 
    name: 'Engineering', 
    lead: 'Rahul Sharma', 
    members: 12, 
    spent: 450000, 
    budget: 600000,
    color: 'bg-indigo-500' 
  },
  { 
    id: '2', 
    name: 'Marketing', 
    lead: 'Sneha Gupta', 
    members: 5, 
    spent: 85000, 
    budget: 100000,
    color: 'bg-emerald-500' 
  },
  { 
    id: '3', 
    name: 'Operations', 
    lead: 'Amit Verma', 
    members: 4, 
    spent: 120000, 
    budget: 110000, // Over budget case
    color: 'bg-rose-500' 
  },
  { 
    id: '4', 
    name: 'Growth', 
    lead: 'Priya Singh', 
    members: 3, 
    spent: 45000, 
    budget: 75000,
    color: 'bg-amber-500' 
  },
];

const Teams = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Teams & Departments</h1>
          <p className="text-sm text-slate-500">Manage departmental budgets and personnel.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} /> Create New Team
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Teams" 
          value={MOCK_TEAMS.length} 
          icon={Target} 
          trend="up" 
          trendValue={0} 
        />
        <StatCard 
          title="Active Members" 
          value="24" 
          icon={Users} 
          trend="up" 
          trendValue={8} 
        />
        <StatCard 
          title="Budget Utilization" 
          value="78%" 
          icon={Briefcase} 
          trend="down" 
          trendValue={2} 
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {MOCK_TEAMS.map((team) => {
          const percentage = Math.min((team.spent / team.budget) * 100, 100);
          const isOverBudget = team.spent > team.budget;

          return (
            <Card key={team.id} className="group hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg", team.color)}>
                      {team.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{team.name}</h3>
                      <p className="text-xs text-slate-500">Lead: {team.lead}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Budget Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500 uppercase tracking-wider">Budget Utilization</span>
                      <span className={cn("font-bold", isOverBudget ? "text-rose-500" : "text-slate-900 dark:text-white")}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          isOverBudget ? "bg-rose-500" : "bg-indigo-600"
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Financial Details */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Spent</p>
                      <p className="text-sm font-bold mt-1">{formatCurrency(team.spent)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Total Budget</p>
                      <p className="text-sm font-bold mt-1">{formatCurrency(team.budget)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(team.members, 4))].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                        U{i+1}
                      </div>
                    ))}
                    {team.members > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                        +{team.members - 4}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;