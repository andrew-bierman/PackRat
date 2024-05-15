export function getEnumValues<T>(enumType: T): Array<T[keyof T]> {
  return Object.values(enumType).filter(
    (value) => typeof value === 'number' || typeof value === 'string',
  );
}
