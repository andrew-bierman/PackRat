export const truncateString = (str, maxLength) => {
  if (!str) return "";

  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength - 3) + "...";
};
