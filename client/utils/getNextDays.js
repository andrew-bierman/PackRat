export const getNext4Days = (day) => {
  let daysArr = [];

  for (let i = 1; i <= 4; i++) {
    if (day + i > 6) {
      let nextDay = day + i - 7;
      daysArr.push(nextDay);
    } else {
      let nextDay = day + i;
      daysArr.push(nextDay);
    }
  }

  return daysArr;
};
