import React, { useState } from 'react';
import { Plus, Search, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import TeamForm from '../../components/forms/TeamForm';
import BaseModal from '../../components/modals/BaseModal';
import { Card, CardContent } from '../../components/ui/card';
import { formatCurrency } from '../../lib/utils';
import { motion } from 'framer-motion';

const MOCK_TEAMS = [
  { id: '1', name: 'Engineering', members: 12, budget: 50000, spent: 32500, lead: 'Alex Rivera' },
  { id: '2', name: 'Marketing', members: 5, budget: 15000, spent: 14200, lead: 'Sarah Chen' },
  { id: '3', name: 'Product', members: 4, budget: 20000, spent: 8000, lead: 'Mike Johnson' },
  { id: '4', name: 'Growth', members: 3, budget: 10000, spent: 11500, lead: 'Elena Rodriguez' },
];

const TeamList = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Teams" 
        subtitle="Manage department budgets and organizational structure."
        action={
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
          >
            <Plus size={20} /> Create Team
          </button>
        }
      />

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEAMS.map((team, idx) => {
          const usagePercent = (team.spent / team.budget) * 100;
          const isOverBudget = team.spent > team.budget;

          return (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <Users className="text-slate-600 dark:text-slate-400 group-hover:text-indigo-600" size={24} />
                    </div>
                    <ArrowUpRight className="text-slate-300 group-hover:text-indigo-600" size={20} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{team.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">Lead: {team.lead}</p>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Monthly Spend</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatCurrency(team.spent)}
                      </span>
                    </div>

                    {/* Budget Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isOverBudget ? 'bg-rose-500' : usagePercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                      <span className={isOverBudget ? 'text-rose-600' : 'text-slate-400'}>
                        {usagePercent.toFixed(0)}% Utilized
                      </span>
                      <span className="text-slate-400">Limit: {formatCurrency(team.budget)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Create Team Modal */}
      <BaseModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        title="Create New Team"
        description="Define a new department and set its monthly spending limit."
      >
        <TeamForm onSubmit={(data) => console.log(data)} />
      </BaseModal>
    </div>
  );
};

export default TeamList;