/**
 * Determines if an object is empty.
 *
 * @param {Object} obj - The object to check.
 * @return {boolean} - True if the object is empty, false otherwise.
 */
export function isObjectEmpty(obj: Object): boolean {
  return Object.keys(obj).length === 0;
}
