/**
 * Standard expense categories for a startup environment.
 */
export const TRANSACTION_CATEGORIES = [
  { id: 'payroll', label: 'Payroll', icon: 'Users', color: 'bg-blue-500', hex: '#3b82f6' },
  { id: 'marketing', label: 'Marketing', icon: 'Megaphone', color: 'bg-pink-500', hex: '#ec4899' },
  { id: 'cloud', label: 'Cloud Infrastructure', icon: 'Server', color: 'bg-cyan-500', hex: '#06b6d4' },
  { id: 'rent', label: 'Office Rent', icon: 'Building', color: 'bg-amber-500', hex: '#f59e0b' },
  { id: 'legal', label: 'Legal & Audit', icon: 'Shield', color: 'bg-purple-500', hex: '#a855f7' },
  { id: 'other', label: 'Miscellaneous', icon: 'MoreHorizontal', color: 'bg-slate-500', hex: '#64748b' },
];

/**
 * User roles and permissions levels.
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  VIEWER: 'viewer',
};

/**
 * Global App Metadata.
 */
export const APP_CONFIG = {
  NAME: 'Stellar Finance',
  CURRENCY_SYMBOL: '₹',
  DEFAULT_CURRENCY: 'INR',
};