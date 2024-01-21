import { Box } from 'tamagui';

import {
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { createColumns } from './columnsParser';
import { DataTable } from './Table';
 

function App({ data = [{}], resize = false }) {

  const columns = createColumns(data);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing:true,
    columnResizeMode:  'onChange'
  });

  return (
    <div className="p-2">
      <DataTable
      table = {table}
      />
    </div>
  );
}
  
export default App;
