/**
 * Generates an array of the next 4 days based on a given day.
 *
 * @param {number} day - The current day (0-6, where 0 is Sunday).
 * @return {number[]} An array of the next 4 days (0-6, where 0 is Sunday).
 */
export const getNext4Days = (day: number): number[] => {
  const daysArr: number[] = [];

  for (let i = 1; i <= 4; i++) {
    if (day + i > 6) {
      const nextDay = day + i - 7;
      daysArr.push(nextDay);
    } else {
      const nextDay = day + i;
      daysArr.push(nextDay);
    }
  }

  return daysArr;
};
