/**
 * Shared Chart Configurations for Stellar Finance Platform
 */

export const CHART_COLORS = {
  primary: '#6366f1',    // Indigo 500
  secondary: '#10b981',  // Emerald 500
  danger: '#f43f5e',     // Rose 500
  warning: '#f59e0b',    // Amber 500
  info: '#3b82f6',       // Blue 500
  muted: '#94a3b8',      // Slate 400
  background: '#ffffff',
  darkBackground: '#0f172a'
};

/**
 * Standardized Tooltip Props for Recharts
 * @param {boolean} isDarkMode - Adjusts tooltip colors based on theme
 */
export const tooltipProps = (isDarkMode = false) => ({
  contentStyle: {
    backgroundColor: isDarkMode ? CHART_COLORS.darkBackground : CHART_COLORS.background,
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    fontSize: '12px',
    fontWeight: '600',
    color: isDarkMode ? '#f8fafc' : '#1e293b',
    padding: '10px 14px'
  },
  itemStyle: {
    padding: '2px 0',
    textTransform: 'capitalize'
  },
  cursor: {
    stroke: isDarkMode ? '#334155' : '#e2e8f0',
    strokeWidth: 2
  }
});

/**
 * Mock data for early-stage development
 */
export const MOCK_CHART_DATA = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
];