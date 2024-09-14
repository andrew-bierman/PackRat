import { sql } from 'drizzle-orm';

export function literal(value: string) {
  return sql`${value}`;
}

export const jsonArray = (...fields: any[]) =>
  sql`json_array(${sql.join(fields, ',')})`;

export const jsonGroupArray = (field: any) => sql`json_group_array(${field})`;

export const coalesce = (value1: any, value2: any) =>
  sql`coalesce(${value1}, ${value2})`;
