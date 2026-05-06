import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const LoadingSpinner = ({ size = 24, className }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 
        className={cn("animate-spin text-indigo-600 dark:text-indigo-400", className)} 
        size={size} 
      />
    </div>
  );
};

export default LoadingSpinner;