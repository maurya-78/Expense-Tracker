import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  FileText, 
  Calendar, 
  ArrowRight, 
  Download, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const ReportIndex = () => {
  const navigate = useNavigate();

  const reportModules = [
    {
      title: "Global Intelligence",
      desc: "Comprehensive board-level summaries of burn rate and runway projections.",
      path: "/reports/global",
      icon: BarChart3,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      stats: "Updated 2h ago"
    },
    {
      title: "Monthly Audit",
      desc: "Detailed month-over-month reconciliation and anomaly detection.",
      path: "/reports/monthly",
      icon: Calendar,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      stats: "May 2026 Ready"
    },
    {
      title: "Report Generator",
      desc: "Custom builder for executive summaries and departmental deep dives.",
      path: "/reports/generator",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      stats: "Power Tool"
    }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-10 pb-20">
      <PageHeader 
        title="Reporting Hub" 
        subtitle="Access specialized financial intelligence modules and historical archives"
      />

      {/* Featured Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportModules.map((module, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card 
              className="group p-8 h-full border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => navigate(module.path)}
            >
              <div>
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", module.bg, module.color)}>
                  <module.icon size={28} />
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">{module.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-6">
                  {module.desc}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Clock size={12} /> {module.stats}
                </span>
                <ArrowRight size={20} className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Insights Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-border shadow-sm bg-secondary/20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight">Need a board deck fast?</h3>
                <p className="text-sm text-muted-foreground font-medium max-w-md">
                  Our automated generator compiles the latest burn analysis, runway data, and team spending into a professionally formatted PDF.
                </p>
              </div>
              <Button onClick={() => navigate('/reports/generator')} className="gap-2 px-8 py-6 rounded-2xl font-black shadow-xl shadow-primary/20 shrink-0">
                Launch Generator <Zap size={18} fill="currentColor" />
              </Button>
            </div>
            {/* Visual Flare */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={20} className="text-emerald-500" />
                <h4 className="font-bold text-sm">Key Trend</h4>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Operating efficiency has improved by <span className="text-foreground font-bold">12.4%</span> this quarter following the SaaS consolidation project.
              </p>
            </Card>

            <Card className="p-6 border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-primary" />
                <h4 className="font-bold text-sm">Compliance Status</h4>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                All May transactions have been reconciled and digitally signed. Audit logs are ready for the upcoming Q2 review.
              </p>
            </Card>
          </div>
        </div>

        {/* Historical Archives Sidebar */}
        <Card className="p-0 border-border shadow-md overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border bg-card flex justify-between items-center">
            <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <FileText size={16} className="text-primary" /> Archives
            </h3>
            <span className="text-[10px] font-black text-muted-foreground bg-secondary px-2 py-0.5 rounded">2026</span>
          </div>
          <div className="p-4 flex-1 divide-y divide-border/50">
            {[
              { name: 'April_Performance_Report', date: 'May 02', type: 'PDF' },
              { name: 'Q1_Financial_Board_Deck', date: 'Apr 05', type: 'PPTX' },
              { name: 'Personnel_Tax_Docs_2025', date: 'Mar 15', type: 'ZIP' },
              { name: 'Infrastructure_Spend_Audit', date: 'Feb 20', type: 'CSV' },
            ].map((file, i) => (
              <div key={i} className="py-4 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-secondary/50 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FileText size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground font-bold">{file.date} • {file.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download size={14} />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary border-t border-border rounded-none">
            View Full Archives
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ReportIndex;