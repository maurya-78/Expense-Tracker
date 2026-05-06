import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Calendar, 
  MapPin, ShieldCheck, History 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { formatCurrency } from '../../lib/utils';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = {
    name: "Alex Rivera",
    role: "Senior Engineer",
    team: "Engineering",
    email: "alex@startup.io",
    salary: 125000,
    joinDate: "Jan 12, 2024",
    location: "Remote (PT)",
    status: "Active"
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="gap-2 -ml-2 text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} /> Back to Directory
      </Button>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardContent className="pt-8 text-center">
              <div className="h-24 w-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                AR
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{employee.name}</h2>
              <p className="text-indigo-600 font-semibold">{employee.role}</p>
              <div className="flex justify-center gap-2 mt-4">
                <Button size="sm" variant="outline" className="rounded-full">Message</Button>
                <Button size="sm" className="rounded-full">Edit Profile</Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-left space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Mail size={16} /> {employee.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar size={16} /> Joined {employee.joinDate}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin size={16} /> {employee.location}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial & Role Details */}
        <div className="flex-1 space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-slate-500 uppercase tracking-wider">Current Compensation</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(employee.salary)}
                  <span className="text-sm font-medium text-slate-400 ml-2">Annually</span>
                </h3>
                <p className="text-sm text-slate-500 mt-2">Next Salary Review: July 2026</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-slate-500 uppercase tracking-wider">Team Assignment</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{employee.team}</h3>
                  <p className="text-sm text-slate-500">Reports to Alex Rivera (CTO)</p>
                </div>
                <ShieldCheck className="text-indigo-600" size={32} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Work History & Adjustments</CardTitle>
              <History size={18} className="text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8 pb-4">
                {[
                  { title: "Annual Salary Increase", date: "Jan 01, 2025", desc: "+$10,000 performance adjustment" },
                  { title: "Promoted to Senior Engineer", date: "June 15, 2024", desc: "Change in responsibility level" },
                  { title: "Onboarded to Platform", date: "Jan 12, 2024", desc: "Initial contract signed" },
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-600" />
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.date}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;