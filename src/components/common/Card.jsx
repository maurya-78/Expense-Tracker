import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className }) => (
  <div className={cn("rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900", className)}>
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, className }) => (
  <div className={cn("p-6 border-b border-slate-100 dark:border-slate-800", className)}>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
    {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("p-6", className)}>{children}</div>
);