/**
 * Truncates long text for table cells
 */
export const truncate = (str, length = 30) => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
};

/**
 * Generates initials for user avatars
 */
export const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Slugify text for URL parameters
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};