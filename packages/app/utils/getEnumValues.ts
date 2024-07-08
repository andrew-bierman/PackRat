export function getEnumValues<T extends Record<string, string | number>>(
  enumType: T,
): Array<T[keyof T]> {
  return (Object.values(enumType) as Array<T[keyof T]>).filter(
    (value) => typeof value === 'number' || typeof value === 'string',
  );
}
