import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '../../lib/utils';

const RunwayProgress = ({
  months = 0,
  maxMonths = 24,
}) => {
  const percentage = Math.min(
    (months / maxMonths) * 100,
    100
  );

  const getStatusColor = (m) => {
    if (m > 12) return 'bg-emerald-500';
    if (m > 6) return 'bg-amber-500';

    return 'bg-rose-500';
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            Projected Runway
          </p>

          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {months} Months
          </h3>
        </div>

        <span
          className={cn(
            'text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider text-white',
            getStatusColor(months)
          )}
        >
          {months > 6 ? 'Healthy' : 'Critical'}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          className={cn(
            'h-full rounded-full shadow-sm',
            getStatusColor(months)
          )}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          0M
        </span>

        <p className="text-[10px] text-slate-400 italic">
          Target: 18+ Months
        </p>

        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {maxMonths}M
        </span>
      </div>
    </div>
  );
};

export default RunwayProgress;