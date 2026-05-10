/**
 * Financial Categories
 * Used in dropdowns, charts, and filtering logic.
 */
export const TRANSACTION_CATEGORIES = [
  { id: 'payroll', label: 'Payroll', icon: 'Users', color: 'bg-blue-500', hex: '#3b82f6' },
  { id: 'marketing', label: 'Marketing', icon: 'Megaphone', color: 'bg-pink-500', hex: '#ec4899' },
  { id: 'cloud', label: 'Cloud Infrastructure', icon: 'Server', color: 'bg-cyan-500', hex: '#06b6d4' },
  { id: 'rent', label: 'Office Rent', icon: 'Building', color: 'bg-amber-500', hex: '#f59e0b' },
  { id: 'legal', label: 'Legal & Audit', icon: 'Shield', color: 'bg-purple-500', hex: '#a855f7' },
  { id: 'travel', label: 'Business Travel', icon: 'Plane', color: 'bg-emerald-500', hex: '#10b981' },
];

/**
 * Auth & Permissions
 */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  VIEWER: 'VIEWER',
};

/**
 * Financial Benchmarks (In Months)
 * Used by getFinancialHealthStatus logic.
 */
export const RUNWAY_THRESHOLDS = {
  HEALTHY: 12,
  WARNING: 6,
  CRITICAL: 3,
};

/**
 * UI Constants
 */
export const APP_CONFIG = {
  NAME: 'Stellar Finance',
  DEFAULT_CURRENCY: 'INR',
  SUPPORT_EMAIL: 'support@sharmapaints.com',
  ITEMS_PER_PAGE: 10,
};

/**
 * API Endpoints
 * Centralizing these makes it easy to version your API later (e.g., changing /v1 to /v2)
 */
export const API_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  TRANSACTIONS: '/expenses',
  ANALYTICS: '/analytics',
  TEAMS: '/teams',
};