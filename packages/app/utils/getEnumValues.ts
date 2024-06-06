export function getEnumValues<T>(enumType: T): Array<T[keyof T]> {
  return (Object.values(enumType) as Array<T[keyof T]>).filter(
    (value) => typeof value === 'number' || typeof value === 'string',
  );
}
