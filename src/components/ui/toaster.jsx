import React from 'react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const icons = {
  success: <CheckCircle2 className="text-emerald-500" size={20} />,
  destructive: <AlertCircle className="text-rose-500" size={20} />,
  info: <Info className="text-indigo-500" size={20} />,
  loading: <Loader2 className="text-indigo-500 animate-spin" size={20} />,
};

export const Toaster = () => {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <div 
      aria-live="assertive" 
      className="fixed bottom-0 right-0 z-[100] flex flex-col p-4 gap-3 w-full max-w-md sm:p-6"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex w-full items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none"
          >
            <div className="mt-0.5">{icons[toast.variant] || icons.info}</div>
            
            <div className="flex-1 space-y-1">
              {toast.title && (
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {toast.title}
                </h4>
              )}
              {toast.message && (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};