import React, { useState, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useMedia } from 'tamagui';
import { Text, View, Button, getTokenValue } from 'tamagui';
import { Table } from './common/tableParts';
import { Pressable } from 'react-native';
import { useRouter } from '@packrat/crosspath';

const ITEMS_PER_PAGE = 10;

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

type GroupedData = Record<string, Item[]>;

interface PaginatedSortedTableProps {
  groupedData: GroupedData;
  handleCheckboxChange: (itemId: string) => void;
  onDelete: (params: { itemId: string; packId: string }) => void;
  hasPermissions: boolean;
  currentPack: any;
  refetch: () => void;
  setRefetch: () => void;
  totalPages: any;
  page: any;
  setPage: any;
}

export function PaginatedSortedTable({
  groupedData,
  onDelete,
  hasPermissions,
  currentPack,
  refetch,
  setRefetch,
  totalPages,
  page,
  setPage,
}: PaginatedSortedTableProps) {
  const columnHelper = createColumnHelper<Item>();
  const router = useRouter();

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: () => 'Name',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('weight', {
      cell: (info) => info.getValue(),
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
    columnHelper.accessor('unit', {
      header: () => 'Unit',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const data = useMemo(() => Object.values(groupedData).flat(), [groupedData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: { pageSize: ITEMS_PER_PAGE, pageIndex: page || 0 },
    },
    manualPagination: true,
    pageCount: totalPages || 1,
  });

  const onPress = (id: string | number) => {
    router.push(`/item/${id}`);
  };

  const { sm } = useMedia();

  if (sm) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 10,
          marginBottom: 30,
        }}
      >
        {table.getRowModel().rows.map((row) => (
          <View
            key={row.id}
            borderRadius="$4"
            borderWidth="$1"
            borderColor="$borderColor"
            flex={1}
            alignSelf="stretch"
            gap="$3"
          >
            <Pressable onPress={() => onPress(row?.original?.id)}>
              <View gap="$3" mx="$3" my="$3">
                {row.getVisibleCells().map((cell) => {
                  const value = cell.getContext().getValue();
                  return (
                    <View fd="row" justifyContent="space-between" key={cell.id}>
                      <Text>
                        {flexRender(
                          cell.column.columnDef.header,
                          cell.getContext(),
                        )}
                      </Text>
                      <Text color="$gray10">{value}</Text>
                    </View>
                  );
                })}
              </View>
            </Pressable>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Button
            onPress={() => setPage(page - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Text
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              padding: 8,
              fontSize: 15,
            }}
          >
            Page {table.getState().pagination.pageIndex} of{' '}
            {table.getPageCount()}
          </Text>
          <Button
            onPress={() => setPage(page + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
    >
      <Table
        alignCells={{ x: 'center', y: 'center' }}
        alignHeaderCells={{ y: 'center', x: 'center' }}
        cellWidth="$18"
        cellHeight="$5"
        borderWidth={0.5}
        maxWidth={getTokenValue('$25') * columns.length}
      >
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row
              backgrounded
              backgroundColor="$color2"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell key={header.id}>
                  <Text onClick={() => header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Head>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id} onPress={() => onPress(row?.original?.id)}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  <Text color="$gray11">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '25%',
          marginTop: 10,
        }}
      >
        <Button
          onPress={() => setPage(page - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Text
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            fontSize: 15,
          }}
        >
          Page {table.getState().pagination.pageIndex} of {table.getPageCount()}
        </Text>
        <Button
          onPress={() => setPage(page + 1)}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </View>
    </View>
  );
}
