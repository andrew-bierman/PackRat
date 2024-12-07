/**
 * Truncates a string if it exceeds a maximum length, appending '...' at the end.
 *
 * @param {string} str - The string to be truncated.
 * @param {number} maxLength - The maximum length of the string.
 * @return {string} The truncated string.
 */
export const truncateString = (str, maxLength) => {
  if (!str) return '';

  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength - 3) + '...';
};
