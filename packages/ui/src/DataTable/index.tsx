import { Box  } from 'tamagui';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import "./table.css"
import { createColumns } from './columnsParser';
import { DataTable } from './Table';

function App({data=[{}]}) {

  const columns = createColumns(data);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange"
  });

  return (
    <div className="p-2">
     <table className="styled-table" style={{ width: table.getTotalSize() }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="styled-th" style={{ width: `${header.getSize()}` }} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  <div
                    className="styled-resizer"
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} className={i % 2 === 0 ? 'styled-tr' : 'styled-tr-alt'}>
              {row.getVisibleCells().map((cell) => (
                <td className="styled-td" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <DataTable rows={table.getRowModel().rows.map((_)=>{
        return _.getVisibleCells().map((cell) => (
           cell.getValue()
        ))
      })}  />
    </div>
  );
}

export default App;
