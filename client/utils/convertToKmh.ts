/**
 * Converts a value from a different unit to kilometers per hour.
 *
 * @param {number} value - The value to be converted.
 * @return {string} The converted value in kilometers per hour.
 */
export const convertToKmh = (value) => {
  const result = value * 3.6;
  return `${Math.floor(Math.round(result))} km/h`;
};
