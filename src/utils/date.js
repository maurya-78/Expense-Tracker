/**
 * Checks if a date falls within the current month and year.
 */
export const isCurrentMonth = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() && 
    date.getFullYear() === now.getFullYear()
  );
};

/**
 * Returns the start and end of the current month for API filtering.
 */
export const getCurrentMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
  return { start, end };
};

/**
 * Returns a relative time string (e.g., "2 days ago").
 */
export const getRelativeTime = (dateString) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = (new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24);
  return rtf.format(Math.round(diff), 'day');
};