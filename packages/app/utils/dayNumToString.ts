/**
 * Converts a numeric day value to its corresponding string representation.
 *
 * @param {number} day - The numeric day value (0-6).
 * @return {string} The string representation of the day.
 */
export const dayNumToString = (day: number): string => {
  let stringDay = 'Invalid day'; // Default value
  switch (day) {
    case 0:
      stringDay = 'Sunday';
      break;
    case 1:
      stringDay = 'Monday';
      break;
    case 2:
      stringDay = 'Tuesday';
      break;
    case 3:
      stringDay = 'Wednesday';
      break;
    case 4:
      stringDay = 'Thursday';
      break;
    case 5:
      stringDay = 'Friday';
      break;
    case 6:
      stringDay = 'Saturday';
      break;
    default:
      stringDay = 'Invalid day';
  }

  return stringDay;
};
