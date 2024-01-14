import * as React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Person = {
      data:string
};

const defaultData: Person[] = [
{
      data: 'test'
}
];

type DataType = {
  [key: string]: string | number;
};

const createColumns = <T extends DataType>(data: T[]) => {
  const columnHelper = createColumnHelper<T>();

  // Get the keys from the first object in the array
  const keys = Object?.keys(data[0]);
  if (keys.length > 0) {
    // Map over the keys to create columns
    const columns = keys.map((key) => {
      return columnHelper.accessor(key as keyof T, {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      });
    });
    return columns;
  }
  return [];
};

// Usage
const columns = createColumns(defaultData);

function App() {
  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

export default App;
