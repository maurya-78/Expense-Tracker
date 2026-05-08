import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Users, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  Receipt,
  UserPlus,
  BarChart3,
  MoreVertical,
  Briefcase
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useTeamStore } from '../../store/useTeamStore';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, cn } from '../../lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { teams } = useTeamStore();
  const { expenses } = useFinanceStore();
  
  const [team, setTeam] = useState(null);
  const [teamExpenses, setTeamExpenses] = useState([]);

  useEffect(() => {
    const foundTeam = teams.find(t => t.id.toString() === id);
    if (foundTeam) {
      setTeam(foundTeam);
      // Filter global expenses for this specific team
      const filtered = expenses.filter(exp => exp.team === foundTeam.name);
      setTeamExpenses(filtered);
    }
  }, [id, teams, expenses]);

  if (!team) return <div className="p-20 text-center font-bold">Loading Department Data...</div>;

  const usagePercent = (team.spending / team.budget) * 100;
  const isOverBudget = usagePercent > 100;

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/teams')}
            className="p-2 hover:bg-secondary rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tight">{team.name}</h1>
            <p className="text-muted-foreground font-medium">Department Head: {team.lead}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit3 size={18} /> Edit Department
          </Button>
          <Button className="gap-2">
            <UserPlus size={18} /> Add Member
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-border shadow-sm">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Monthly Spending</p>
          <h3 className={cn("text-2xl font-black", isOverBudget ? "text-rose-500" : "text-foreground")}>
            {formatCurrency(team.spending)}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 w-fit px-2 py-1 rounded-lg">
            <TrendingUp size={12} /> +2.4% vs Last Month
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Total Budget</p>
          <h3 className="text-2xl font-black">{formatCurrency(team.budget)}</h3>
          <p className="text-xs text-muted-foreground mt-4 font-medium">Resetting in 12 days</p>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Headcount</p>
          <h3 className="text-2xl font-black">{team.members} Members</h3>
          <p className="text-xs text-muted-foreground mt-4 font-medium">2 Open positions</p>
        </Card>

        <Card className={cn(
          "p-6 border-2 shadow-sm",
          isOverBudget ? "border-rose-500/20 bg-rose-500/5" : "border-primary/20 bg-primary/5"
        )}>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Utilization</p>
          <h3 className={cn("text-2xl font-black", isOverBudget ? "text-rose-600" : "text-primary")}>
            {usagePercent.toFixed(1)}%
          </h3>
          {isOverBudget && (
            <div className="mt-4 flex items-center gap-1.5 text-rose-600 text-[10px] font-black uppercase">
              <AlertTriangle size={14} /> Immediate review required
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Expenditure History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold flex items-center gap-2">
                <Receipt size={18} /> Team-Specific Expenses
              </h3>
              <Button variant="ghost" size="sm" className="text-primary font-bold uppercase tracking-widest text-[10px]">
                Filter by date
              </Button>
            </div>
            
            <div className="divide-y divide-border">
              {teamExpenses.length > 0 ? teamExpenses.map((exp) => (
                <div key={exp.id} className="py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{exp.title}</p>
                      <p className="text-xs text-muted-foreground font-medium">{exp.date} • {exp.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-rose-500">-{formatCurrency(exp.amount)}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Verified</p>
                  </div>
                </div>
              )) : (
                <div className="py-20 text-center text-muted-foreground">
                  <p>No transactions recorded for this team.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-sm">
            <h4 className="text-sm font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={18} /> Budget Allocation
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span>Personnel</span>
                  <span>72%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[72%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span>Software & Tools</span>
                  <span>18%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[18%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span>Travel & Misc</span>
                  <span>10%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 w-[10%]" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border shadow-sm bg-slate-900 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Strategic Note</h4>
              <p className="text-sm leading-relaxed text-slate-300 italic">
                "Scaling Engineering headcount by 20% next quarter. Ensure AWS reservation instances are optimized to keep software burn below $15k/mo."
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">C</div>
                <p className="text-xs font-bold text-slate-400">CEO Perspective</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;