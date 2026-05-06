import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SmartAlertCard = ({ type = 'warning', message, onDismiss }) => {
  const isCritical = type === 'critical';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "relative p-4 rounded-xl border flex gap-4 items-start shadow-sm",
          isCritical 
            ? "bg-rose-50 border-rose-100 dark:bg-rose-900/10 dark:border-rose-900/30" 
            : "bg-amber-50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30"
        )}
      >
        <div className={cn(
          "mt-0.5",
          isCritical ? "text-rose-600" : "text-amber-600"
        )}>
          <AlertCircle size={20} />
        </div>
        
        <div className="flex-1">
          <p className={cn(
            "text-sm font-bold",
            isCritical ? "text-rose-900 dark:text-rose-200" : "text-amber-900 dark:text-amber-200"
          )}>
            {isCritical ? 'Critical Action Required' : 'Budget Warning'}
          </p>
          <p className={cn(
            "text-xs mt-1 leading-relaxed",
            isCritical ? "text-rose-700 dark:text-rose-300" : "text-amber-700 dark:text-amber-300"
          )}>
            {message}
          </p>
        </div>

        <button 
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default SmartAlertCard;