import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  TrendingUp, 
  MoreVertical, 
  ChevronRight, 
  Target,
  AlertCircle
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useTeamStore } from '../../store/useTeamStore';
import { formatCurrency, cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const TeamList = () => {
  const navigate = useNavigate();
  const { teams } = useTeamStore();
  const [search, setSearch] = useState('');

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.lead.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8">
      <PageHeader 
        title="Departments" 
        subtitle="Manage organizational structure and departmental capital allocation"
        action={
          <Button onClick={() => navigate('/teams/create')} className="gap-2">
            <Plus size={18} /> Create Team
          </Button>
        }
      />

      {/* Analytics Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-border bg-primary/5 border-primary/20 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-primary tracking-widest">Total Headcount</p>
            <p className="text-2xl font-black">{teams.reduce((a, b) => a + b.members, 0)} Members</p>
          </div>
        </Card>
        
        <Card className="p-6 border-border flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
            <Target size={24} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Global Budget</p>
            <p className="text-2xl font-black">{formatCurrency(teams.reduce((a, b) => a + b.budget, 0))}</p>
          </div>
        </Card>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text"
            placeholder="Search teams or leads..."
            className="w-full h-full pl-12 pr-4 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTeams.map((team, idx) => {
          const usagePercent = (team.spending / team.budget) * 100;
          const isOverBudget = usagePercent > 100;

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={team.id}
            >
              <Card 
                className="group p-6 border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                onClick={() => navigate(`/teams/${team.id}`)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Team Info */}
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">{team.name}</h3>
                      {isOverBudget && (
                        <span className="flex items-center gap-1 text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase">
                          <AlertCircle size={10} /> Over Budget
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Managed by <span className="text-foreground">{team.lead}</span></p>
                  </div>

                  {/* Budget Visualization */}
                  <div className="flex-[2] space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black uppercase text-muted-foreground tracking-widest">Budget Utilization</span>
                      <span className={cn(
                        "text-sm font-black",
                        isOverBudget ? "text-rose-500" : "text-primary"
                      )}>
                        {usagePercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(usagePercent, 100)}%` }}
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          isOverBudget ? "bg-rose-500" : "bg-primary"
                        )}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-10 px-8 border-l border-border hidden xl:flex">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Monthly Spend</p>
                      <p className="text-lg font-black">{formatCurrency(team.spending)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Budget</p>
                      <p className="text-lg font-black text-muted-foreground">{formatCurrency(team.budget)}</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                      <ChevronRight size={24} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamList;