/**
 * Formats a numeric value into a currency string.
 * Supports INR and USD localization.
 */
export const formatCurrency = (amount, currency = 'USD') => {
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount || 0);
};

/**
 * Formats a date into a clean, readable string.
 * Example: "May 10, 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Formats large numbers into a compact format (e.g., 1.2M, 50K).
 */
export const formatCompactNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number || 0);
};