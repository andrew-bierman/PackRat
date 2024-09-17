import { type HeaderGroup, type Row, flexRender } from '@tanstack/react-table';
import { useMedia } from 'tamagui';
import * as React from 'react';
import { Text, View, getTokenValue } from 'tamagui';
import { Table } from './common/tableParts';

interface BasicTableProps<T extends object> {
  headerGroup: HeaderGroup<T>;
  tableRows: Row<T>[];
  footerGroup?: HeaderGroup<T>;
  columnsLength: number;
}

export function BasicTable<T extends object>({
  headerGroup,
  tableRows,
  footerGroup,
  columnsLength,
}: BasicTableProps<T>) {
  const CELL_WIDTH = '$18';

  const { sm } = useMedia();

  const rowCounter = React.useRef(-1);
  rowCounter.current = -1;

  if (sm) {
    return (
      <View alignItems="center" justifyContent="center" width="100%" gap="$5">
        {tableRows.map((row) => {
          return (
            <View
              key={row.id}
              borderRadius="$4"
              borderWidth="$1"
              borderColor="$borderColor"
              alignSelf="stretch"
              gap="$3"
              p="$3"
            >
              {row.getVisibleCells().map((cell) => (
                <View key={cell.id} fd="row" justifyContent="space-between">
                  <Text color="$gray10">
                    {flexRender(
                      cell.column.columnDef.header,
                      headerGroup.headers[cell.column.getIndex()].getContext(),
                    )}
                  </Text>
                  <Text color="$gray11">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Table
        alignCells={{ x: 'center', y: 'center' }}
        alignHeaderCells={{ y: 'center', x: 'center' }}
        cellWidth={CELL_WIDTH}
        cellHeight="$5"
        borderWidth={0.5}
        maxWidth={getTokenValue(CELL_WIDTH) * columnsLength}
      >
        <Table.Head>
          <Table.Row backgrounded backgroundColor="$color2">
            {headerGroup.headers.map((header) => (
              <Table.HeaderCell key={header.id}>
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
        </Table.Head>
        <Table.Body>
          {tableRows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id} px="$1">
                  <Text color="$gray11" ta="center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </View>
  );
}

BasicTable.fileName = 'Basic';
