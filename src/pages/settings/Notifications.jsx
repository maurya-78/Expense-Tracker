import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch'; // Assuming shadcn switch

const NotificationSettings = () => {
  const settings = [
    { id: 'burn', title: 'Burn Rate Alerts', desc: 'Notify when burn rate increases by >15% monthly.' },
    { id: 'runway', title: 'Low Runway Warnings', desc: 'Alert when projected runway falls below 6 months.' },
    { id: 'budget', title: 'Team Budget Limits', desc: 'Notify when a department reaches 90% of their limit.' },
    { id: 'reports', title: 'Report Availability', desc: 'Receive email when monthly fiscal reports are ready.' },
  ];

  return (
    <div className="max-w-3xl space-y-4">
      {settings.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
            {/* Using a basic button toggle as a placeholder for the Switch component */}
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
               <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationSettings;