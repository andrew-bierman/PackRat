export const convertToCelsius = (value) => {
  let result = ((value - 32) * 5) / 9;
  return `${Math.round(result)} °C`;
};
