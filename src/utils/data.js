/**
 * Formats file sizes for the UI
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Simple JSON to CSV converter for report exports
 */
export const convertToCSV = (objArray) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  const headers = Object.keys(array[0]).join(',');
  str += headers + '\r\n';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line !== '') line += ',';
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
};