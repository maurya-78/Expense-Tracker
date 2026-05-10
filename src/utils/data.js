/**
 * Groups an array of objects by a specific key.
 * Useful for grouping expenses by category or department.
 */
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
};

/**
 * Sorts an array of objects by a numeric or string property.
 */
export const sortBy = (array, key, order = 'desc') => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Sums a specific property in an array of objects.
 */
export const sumBy = (array, key) => {
  return array.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
};