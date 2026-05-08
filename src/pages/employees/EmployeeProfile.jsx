import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Mail, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  MapPin,
  FileText,
  TrendingUp,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { formatCurrency, cn } from '../../lib/utils';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data fetching based on ID
  const [employee, setEmployee] = useState({
    id: id,
    name: 'Alice Johnson',
    role: 'Senior Software Engineer',
    team: 'Engineering',
    email: 'alice.j@stellar-ai.io',
    salary: 12500,
    type: 'Full-time',
    status: 'Active',
    joinedDate: 'Jan 12, 2024',
    location: 'San Francisco, CA (Remote)',
    bio: 'Lead frontend architect specializing in React and financial visualization systems. Responsible for the core dashboard engine.',
    performance: 'Exceeding Expectations'
  });

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Nav & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button 
          onClick={() => navigate('/employees')}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Directory
        </button>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none gap-2 rounded-xl">
            <Edit3 size={16} /> Edit Profile
          </Button>
          <Button className="flex-1 sm:flex-none gap-2 rounded-xl shadow-lg shadow-primary/20">
            Manage Payroll
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Essential Info */}
        <div className="space-y-6">
          <Card className="p-8 border-border shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-xl">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h1 className="text-2xl font-black tracking-tight">{employee.name}</h1>
            <p className="text-primary font-bold text-sm mb-6">{employee.role}</p>
            
            <div className="flex justify-center gap-2 mb-8">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                {employee.status}
              </span>
              <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-[10px] font-black uppercase tracking-widest border border-border">
                {employee.type}
              </span>
            </div>

            <div className="space-y-4 text-left border-t border-border pt-6">
              <div className="flex items-center gap-3 text-sm font-medium">
                <Mail className="text-muted-foreground" size={18} />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Briefcase className="text-muted-foreground" size={18} />
                <span>{employee.team} Department</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <MapPin className="text-muted-foreground" size={18} />
                <span>{employee.location}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border shadow-sm bg-primary/5 border-primary/10">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Financial Footprint</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground font-medium">Monthly Cost</p>
                <p className="text-xl font-black">{formatCurrency(employee.salary)}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground font-medium">Annualized</p>
                <p className="text-lg font-bold text-muted-foreground">{formatCurrency(employee.salary * 12)}</p>
              </div>
              <div className="pt-4 border-t border-primary/10">
                <p className="text-[10px] leading-relaxed text-primary/70 font-medium">
                  * Cost includes base salary. Equity and benefits are managed in the secondary Cap Table module.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Details & History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-border shadow-sm">
            <h3 className="text-lg font-black mb-4">Professional Overview</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {employee.bio}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-secondary/30 rounded-2xl border border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Joined Date</p>
                <div className="flex items-center gap-2 font-bold">
                  <Calendar size={16} className="text-primary" />
                  {employee.joinedDate}
                </div>
              </div>
              <div className="p-4 bg-secondary/30 rounded-2xl border border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Performance Rating</p>
                <div className="flex items-center gap-2 font-bold">
                  <TrendingUp size={16} className="text-emerald-500" />
                  {employee.performance}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-0 border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Clock size={18} className="text-primary" /> Career Roadmap
              </h3>
              <button className="text-xs font-bold text-primary hover:underline uppercase">Full History</button>
            </div>
            <div className="p-6 space-y-8 relative before:absolute before:left-9 before:top-10 before:bottom-10 before:w-px before:bg-border">
              {[
                { title: 'Promoted to Senior Engineer', date: 'March 2025', desc: 'Assumed leadership of the Core UI squad.' },
                { title: 'Onboarded to Stellar AI', date: 'January 2024', desc: 'Joined as Software Engineer II.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full bg-background border-2 border-primary z-10 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-primary font-bold mb-1">{item.date}</p>
                    <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-border shadow-sm flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Employment Contract</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">PDF • 2.4 MB</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Card>

            <Card className="p-6 border-border shadow-sm flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Compliance Docs</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Verified 2026</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;