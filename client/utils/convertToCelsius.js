/**
 * Converts a value from Fahrenheit to Celsius.
 *
 * @param {number} value - The value to be converted.
 * @return {string} The converted value in Celsius.
 */
export const convertToCelsius = (value) => {
  const result = ((value - 32) * 5) / 9;
  return `${Math.round(result)} °C`;
};
