import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes without style conflicts.
 * Essential for dynamic styling in your dashboard cards.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats numbers into standard currency strings.
 * Defaulting to INR for your local shop/startup context.
 */
export const formatCurrency = (value, currency = 'INR', locale = 'en-IN') => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue) || numericValue === null) {
    return currency === 'INR' ? '₹0.00' : '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(numericValue);
};

/**
 * Formats dates into a readable format.
 * Example: "May 10, 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  
  // Check for invalid dates to prevent "Invalid Date" showing in UI
  if (isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Calculates the percentage change between two values.
 * Useful for "Burn Rate" variance or month-over-month growth.
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  const change = ((current - previous) / previous) * 100;
  return parseFloat(change.toFixed(1));
};

/**
 * Truncates long strings for UI elements like table cells.
 */
export const truncate = (str, length = 20) => {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

/**
 * Returns a color scheme based on financial health (Runway).
 * Aligned with: 12+ Healthy, 6+ Warning, <6 Critical.
 */
export const getHealthColor = (runwayMonths) => {
  if (runwayMonths >= 12) return 'text-emerald-500'; // Healthy
  if (runwayMonths >= 6) return 'text-amber-500';   // Warning
  return 'text-rose-500';                           // Critical
};

/**
 * Formats large numbers into compact versions (e.g., 1.2L, 50K).
 * Updated to use Indian numbering system (Lakhs/Crores).
 */
export const formatCompactNumber = (number, locale = 'en-IN') => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number || 0);
};