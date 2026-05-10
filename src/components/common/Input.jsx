import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950",
          error && "border-rose-500 focus-visible:ring-rose-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-rose-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;