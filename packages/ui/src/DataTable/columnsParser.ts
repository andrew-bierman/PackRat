import { createColumnHelper, Column } from '@tanstack/react-table';

type DataType = {
  [key: string | number]: string | number;
};

export const createColumns = <T extends DataType>(
  data: T[],
): Column<T, unknown>[] => {
  const columnHelper = createColumnHelper<T>();

  // Get the keys from the first object in the array
  const keys = Object?.keys(data[0] as T);
  if (keys.length > 0) {
    // Map over the keys to create columns
    const columns = keys.map((key) => {
      return columnHelper.accessor((row: T) => row[key as keyof T], {
        id: key.toString(),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }) as Column<T, unknown>;
    });
    return columns;
  }
  return [];
};
