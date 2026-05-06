import { cn } from '../../lib/utils';

const FormField = ({ label, error, children, className }) => {
  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs font-medium text-rose-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;