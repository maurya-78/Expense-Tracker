import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter, // Added Footer component
} from "../ui/dialog";
import { cn } from "../../lib/utils";

/**
 * BaseModal - A standardized wrapper for all overlays in the app.
 * Includes auto-scroll for long content and consistent dark-mode styling.
 */
const BaseModal = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  footer, // Custom footer actions (Buttons)
  className,
  size = "md" // Allows different widths
}) => {
  
  // Map sizes to Tailwind widths
  const sizeClasses = {
    sm: "sm:max-w-[425px]",
    md: "sm:max-w-[525px]",
    lg: "sm:max-w-[700px]",
    xl: "sm:max-w-[900px]"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-0 overflow-hidden flex flex-col",
          sizeClasses[size],
          className
        )}
      >
        {/* Header Section */}
        <div className="p-6 pb-2">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-slate-500 dark:text-slate-400">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        {/* Content Section - Added max-height and scrolling */}
        <div className="px-6 py-4 overflow-y-auto max-h-[70vh] custom-scrollbar">
          {children}
        </div>

        {/* Footer Section - Conditional rendering */}
        {footer && (
          <div className="p-6 pt-2 border-t border-slate-100 dark:border-slate-800">
            <DialogFooter className="flex gap-2 sm:justify-end">
              {footer}
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;