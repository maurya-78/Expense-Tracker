import { FolderOpen } from 'lucide-react';

const EmptyState = ({ 
  title = "No data found", 
  description = "There are no records to display at this moment.",
  icon: Icon = FolderOpen,
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-full mb-4">
        <Icon className="text-slate-400" size={40} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mt-1 mb-6">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;