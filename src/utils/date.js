import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

/**
 * Formats a date for the UI (e.g., Mar 24, 2026)
 */
export const formatDate = (date) => {
  if (!date) return '-';
  return format(new Date(date), 'MMM dd, yyyy');
};

/**
 * Returns labels for the last 6 months (for charts)
 */
export const getLastSixMonths = () => {
  return Array.from({ length: 6 })
    .map((_, i) => format(subMonths(new Date(), i), 'MMM'))
    .reverse();
};

/**
 * Checks if a date is within the current fiscal month
 */
export const isCurrentMonth = (date) => {
  const now = new Date();
  const target = new Date(date);
  return (
    target.getMonth() === now.getMonth() && 
    target.getFullYear() === now.getFullYear()
  );
};