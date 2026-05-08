import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  Mail, 
  Briefcase, 
  CreditCard, 
  Filter, 
  MoreVertical,
  ArrowUpRight,
  ChevronRight,
  Globe
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { formatCurrency, cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const mockEmployees = [
  { id: 1, name: 'Alice Johnson', role: 'Senior Engineer', team: 'Engineering', salary: 12500, type: 'Full-time', email: 'alice@startup.com', status: 'Active' },
  { id: 2, name: 'Marcus Miller', role: 'Marketing Lead', team: 'Growth', salary: 9800, type: 'Full-time', email: 'marcus@startup.com', status: 'Active' },
  { id: 3, name: 'Sarah Chen', role: 'UI Architect', team: 'Design', salary: 11000, type: 'Contract', email: 'sarah@startup.com', status: 'Active' },
  { id: 4, name: 'James Wilson', role: 'DevOps Specialist', team: 'Engineering', salary: 13200, type: 'Full-time', email: 'james@startup.com', status: 'On Leave' },
];

const EmployeeList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) || 
    emp.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8">
      <PageHeader 
        title="Team Directory" 
        subtitle="Manage personnel, payroll distribution, and role assignments"
        action={
          <Button onClick={() => navigate('/employees/add')} className="gap-2 shadow-lg shadow-primary/20">
            <UserPlus size={18} /> Add Employee
          </Button>
        }
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text"
            placeholder="Search by name, role, or department..."
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2 rounded-xl">
            <Filter size={18} /> Filters
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none gap-2 rounded-xl">
            <Globe size={18} /> Export
          </Button>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredEmployees.map((emp, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={emp.id}
          >
            <Card 
              className="group p-0 border-border hover:border-primary/40 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-xl"
              onClick={() => navigate(`/employees/${emp.id}`)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-inner">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="p-1 hover:bg-secondary rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{emp.name}</h3>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                    <Briefcase size={14} /> {emp.role}
                  </p>
                </div>

                <div className="space-y-3 py-4 border-y border-border/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Department</span>
                    <span className="font-bold px-2.5 py-0.5 bg-secondary rounded-lg text-[11px] uppercase">{emp.team}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Monthly Cost</span>
                    <span className="font-black text-primary">{formatCurrency(emp.salary)}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    emp.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  )} />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
                    {emp.status}
                  </span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;