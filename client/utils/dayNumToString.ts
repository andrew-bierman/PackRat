/**
 * Converts a numeric day value to its corresponding string representation.
 *
 * @param {number} day - The numeric day value (0-6).
 * @return {string} The string representation of the day.
 */
export const dayNumToString = (day) => {
  switch (day) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
  }

  return day;
};
