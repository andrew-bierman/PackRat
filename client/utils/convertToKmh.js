export const convertToKmh = (value) => {
  let result = value * 3.6;
  return `${Math.floor(Math.round(result))} km/h`;
};
