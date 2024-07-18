export const getCurrentUTCDate = () => {
  const now = new Date();

  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();
  const milliseconds = now.getUTCMilliseconds();

  return new Date(
    Date.UTC(year, month, day, hours, minutes, seconds, milliseconds),
  );
};

export const getUTCDateFromStr = (dateStr: string) => {
  const localDate = new Date(new Date(dateStr));

  return new Date(
    Date.UTC(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate(),
      localDate.getUTCHours(),
      localDate.getUTCMinutes(),
      localDate.getUTCSeconds(),
    ),
  );
};
