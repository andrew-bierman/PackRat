import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMedia } from 'tamagui';
import * as React from 'react';
import { Text, View, getTokenValue } from 'tamagui';
import { Table } from './common/tableParts';

interface Category {
  id: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  ownerId: string;
  weight: number;
  quantity: number;
  unit: string;
  category: Category;
}

interface GroupedData {
  [key: string]: Item[];
}

interface RootObject {
  groupedData: GroupedData;
}

const columnHelper = createColumnHelper<Item>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => 'Name',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('weight', {
    cell: (info) => `${info.getValue()} ${info.row.original.unit}`,
    header: () => 'Weight',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('quantity', {
    header: () => 'Quantity',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('category.name', {
    header: () => 'Category',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const CELL_WIDTH = '$15';
=======
interface GroupedData {
  [key: string]: Item[];
}

interface BasicTableProps {
  groupedData: GroupedData;
  handleCheckboxChange: (itemId: string) => void;
  onDelete: (params: { itemId: string; packId: string }) => void;
  hasPermissions: boolean;
  currentPack: any;
  refetch: () => void;
  setRefetch: () => void;
}
>>>>>>> 718bfde6 (Table Swapping with Bento UI Table)

/** ------ EXAMPLE ------ */
export function BasicTable({ groupedData }: { groupedData: GroupedData }) {
  console.log('Grouped Data', groupedData);

  // Flatten the grouped data into a single array of items
  const data = Object.values(groupedData).flat();

  const [tableData, setTableData] = React.useState<Item[]>(data);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { sm } = useMedia();

  const headerGroups = table.getHeaderGroups();
  const tableRows = table.getRowModel().rows;
  const footerGroups = table.getFooterGroups();

  const allRowsLength =
    tableRows.length + headerGroups.length + footerGroups.length;
  const rowCounter = React.useRef(-1);
  rowCounter.current = -1;

  if (sm) {
    return (
      <YStack gap="$4" width="100%">
        {tableData.map((row, i) => (
          <View
            key={i}
            borderRadius="$4"
            borderWidth="$1"
            borderColor="$borderColor"
            flex={1}
            alignSelf="stretch"
            gap="$3"
          >
            <View gap="$3" mx="$3" my="$3">
              {Object.entries(row).map(([name, value], i) => {
                console.log(name === 'category' ? value : null)
                return (
                  <>
                    {name !== 'ownerId' && name!=='unit' && name!=='id' &&(
                    <View fd="row" justifyContent="space-between">
                      <Text>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                      {
                        name === 'category' ? <Text color="$gray10">{String(value?.name)}</Text> : <Text color="$gray10">{String(value)}</Text>
                      }
                    </View>
                  )}
                  </>
                )
              })}
            </View>
          </View>
        ))}
      </YStack>
=======
              <View fd="row" justifyContent="space-between" alignItems="center">
                <Text>Action</Text>
                <ZDropdown.Native dropdownItems={dropdownItems} />
              </View>
            </View>
          </View>
        ))}
      </View>
>>>>>>> 718bfde6 (Table Swapping with Bento UI Table)
    );
  }

  return (
    <Table
      alignCells={{ x: 'center', y: 'center' }}
      alignHeaderCells={{ y: 'center', x: 'center' }}
      cellWidth={CELL_WIDTH}
      cellHeight="$5"
      borderWidth={0.5}
      maxWidth={getTokenValue(CELL_WIDTH) * columns.length}
    >
      <Table.Head>
        {headerGroups.map((headerGroup) => {
          rowCounter.current++;
          return (
            <Table.Row
              backgrounded
              backgroundColor="$color2"
              rowLocation={
                rowCounter.current === 0
                  ? 'first'
                  : rowCounter.current === allRowsLength - 1
                    ? 'last'
                    : 'middle'
              }
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell
                  cellLocation={
                    header.id === 'name'
                      ? 'first'
                      : header.id === 'category.name'
                        ? 'last'
                        : 'middle'
                  }
                  key={header.id}
                >
                  <Text>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          );
        })}
      </Table.Head>
      <Table.Body>
        {tableRows.map((row) => {
          rowCounter.current++;
          return (
            <Table.Row
              rowLocation={
                rowCounter.current === 0
                  ? 'first'
                  : rowCounter.current === allRowsLength - 1
                    ? 'last'
                    : 'middle'
              }
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  cellLocation={
                    cell.column.id === 'name'
                      ? 'first'
                      : cell.column.id === 'category.name'
                        ? 'last'
                        : 'middle'
                  }
                  key={cell.id}
                >
                  <Text color="$gray11">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </Table.Cell>
              ))}
            </Table.Row>
          );
        })}
      </Table.Body>
      <Table.Foot>
        {footerGroups.map((footerGroup) => {
          rowCounter.current++;
          return (
            <Table.Row
              rowLocation={
                rowCounter.current === 0
                  ? 'first'
                  : rowCounter.current === allRowsLength - 1
                    ? 'last'
                    : 'middle'
              }
              key={footerGroup.id}
            >
              {footerGroup.headers.map((header, index) => (
                <Table.HeaderCell
                  cellLocation={
                    index === 0
                      ? 'first'
                      : index === footerGroup.headers.length - 1
                        ? 'last'
                        : 'middle'
                  }
                  key={header.id}
                >
                  <Text>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          );
        })}
      </Table.Foot>
    </Table>
  );
}

BasicTable.fileName = 'Basic';
