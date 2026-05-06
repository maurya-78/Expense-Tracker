export const CHART_COLORS = {
  primary: '#6366f1',   // Indigo 600
  secondary: '#10b981', // Emerald 500
  danger: '#f43f5e',    // Rose 500
  warning: '#f59e0b',   // Amber 500
  muted: '#94a3b8',     // Slate 400
};

export const tooltipProps = (isDarkMode) => ({
  contentStyle: {
    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  },
  itemStyle: {
    fontSize: '12px',
    fontWeight: '600',
  }
});