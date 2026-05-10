/**
 * Capitalizes the first letter of every word.
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Truncates long strings (e.g., long descriptions in a table).
 */
export const truncate = (str, length = 30) => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Generates initials from a name (e.g., "Sharma Admin" -> "SA").
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