import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes without style conflicts.
 * Usage: cn('px-2 py-1', isError && 'bg-red-50', className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats numbers into standard currency strings.
 * Defaults to USD, but can be configured for internationalization.
 */
export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  if (typeof value !== 'number') return '$0.00';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(value);
};

/**
 * Formats dates into a readable format used in transaction lists.
 * Example: "Oct 24, 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Calculates the percentage change between two values.
 * Useful for "Burn Rate" variance indicators.
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Truncates long strings (like transaction descriptions) for small UI elements.
 */
export const truncate = (str, length) => {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

/**
 * Returns a color scheme based on financial health.
 */
export const getHealthColor = (percentage) => {
  if (percentage > 90) return 'text-rose-500';
  if (percentage > 75) return 'text-amber-500';
  return 'text-emerald-500';
};