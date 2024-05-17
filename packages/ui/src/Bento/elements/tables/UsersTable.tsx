import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { useMedia } from 'tamagui';
import { Avatar, Separator, Text, View, XStack, YStack } from 'tamagui';
import { Table } from './common/tableParts';

type Person = {
  fullName: string;
  username: string;
  age: number;
  visits: number;
  status: string;
  role: string;
  avatar?: string;
};

const defaultData: Person[] = [
  {
    fullName: 'Sara Smith',
    username: '@harry',
    age: 24,
    visits: 100,
    status: 'Offline',
    role: 'Admin',
  },
  {
    fullName: 'Andy loren',
    username: '@andy_dev',
    age: 40,
    visits: 40,
    status: 'Active',
    role: 'Member',
  },
  {
    fullName: 'Bob marley',
    username: '@massouddd',
    age: 45,
    visits: 20,
    status: 'Active',
    role: 'Admin',
  },
  {
    fullName: 'Adam henry',
    username: '@john',
    age: 24,
    visits: 100,
    status: 'Active',
    role: 'Admin',
  },
  {
    fullName: 'Andy loren',
    username: '@andy',
    age: 40,
    visits: 40,
    status: 'Offline',
    role: 'Member',
  },
  {
    fullName: 'Massoud karimi',
    username: '@massoud',
    age: 45,
    visits: 20,
    status: 'Active',
    role: 'Member',
  },
  {
    fullName: 'John',
    username: '@john',
    age: 24,
    visits: 100,
    status: 'Active',
    role: 'Admin',
  },
  {
    fullName: 'Andy Doe',
    username: '@andy',
    age: 40,
    visits: 40,
    status: 'Offline',
    role: 'Admin',
  },
  {
    fullName: 'Preston bennet',
    username: '@outworld',
    age: 45,
    visits: 20,
    status: 'Active',
    role: 'Admin',
  },
  {
    fullName: 'Jack anderson',
    username: '@j_anderson',
    age: 45,
    visits: 20,
    status: 'Offline',
    role: 'Member',
  },
  {
    fullName: 'John peterson',
    username: '@john',
    age: 24,
    visits: 100,
    status: 'Active',
    role: 'Member',
  },
  {
    fullName: 'Tommy resse',
    username: '@tommy',
    age: 40,
    visits: 40,
    status: 'Offline',
    role: 'Member',
  },
  {
    fullName: 'Manuel loren',
    username: '@manuel',
    age: 40,
    visits: 40,
    status: 'Offline',
    role: 'Admin',
  },
].map(
  (row, index) =>
    ({
      ...row,
      avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
    }) as Person,
);

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor(
    (row) => ({
      fullName: row.fullName,
      userName: row.username,
      image: row.avatar,
    }),
    {
      cell: (info) => {
        const { fullName, userName, image } = info.getValue();
        return (
          <View flexDirection="row" alignItems="center" gap="$3" ml="$2">
            <Avatar circular size="$5">
              <Avatar.Image accessibilityLabel="Profile image" src={image} />
              <Avatar.Fallback backgroundColor="$gray6" />
            </Avatar>
            <View flexDirection="column">
              <Text>{fullName}</Text>
              <Text fontSize="$2" lineHeight="$2" fontWeight="$2" theme="alt2">
                {userName}
              </Text>
            </View>
          </View>
        );
      },
      header: () => 'Name',
      id: 'user_base',
    },
  ),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id,
    cell: (info) => {
      const val = info.renderValue();
      return <StatusButton status={val?.toLocaleLowerCase() ?? ''} />;
    },
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    footer: (info) => info.column.id,
  }),
];

const StatusButton = ({ status }: { status: string }) => {
  return (
    <View
      borderRadius={1000_000_000}
      backgroundColor="$color6"
      theme={status?.toLocaleLowerCase() === 'active' ? 'green' : 'orange'}
      paddingHorizontal="$2"
    >
      <Text
        color="$color9"
        $gtXs={{
          fontSize: '$2',
          lineHeight: '$1',
          fontWeight: '$2',
        }}
        fontSize="$1"
        fontWeight="$2"
        lineHeight="$1"
        paddingVertical="$1"
      >
        {status}
      </Text>
    </View>
  );
};

/** ------ EXAMPLE ------ */
export function UsersTable() {
  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroups = table.getHeaderGroups();
  const tableRows = table.getRowModel().rows;
  const footerGroups = table.getFooterGroups();

  const allRowsLenght =
    tableRows.length + headerGroups.length + footerGroups.length;
  const rowCounter = React.useRef(-1);
  rowCounter.current = -1;
  const { sm, xs } = useMedia();

  if (sm) {
    return (
      <YStack gap="$4" width="100%">
        {defaultData.map((row, i) => {
          return (
            <View
              key={i}
              borderRadius="$4"
              borderWidth="$1"
              borderColor="$borderColor"
              flex={1}
              alignSelf="stretch"
              gap="$2"
            >
              <XStack ml="$3" mt="$2.5" gap="$2">
                <Avatar circular size="$3">
                  <Avatar.Image
                    accessibilityLabel="Profile image"
                    src={row.avatar}
                  />
                  <Avatar.Fallback backgroundColor="$gray6" />
                </Avatar>
                <View>
                  <Text>{row.fullName}</Text>
                  <Text fontSize="$3" color="$gray10">
                    {row.username}
                  </Text>
                </View>
                <View ml="auto" pr="$3">
                  <StatusButton status={row.status} />
                </View>
              </XStack>
              <View height={2} backgroundColor={'$borderColor'} />
              <View gap="$3" mx="$3" my="$3" mt="$2">
                {Object.entries(row)
                  .filter(
                    ([name]) =>
                      !['avatar', 'fullName', 'username', 'status'].includes(
                        name,
                      ),
                  )
                  .map(([name, value], i) => {
                    return (
                      <>
                        <View key={i} fd="row" justifyContent="space-between">
                          <Text>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                          </Text>
                          <Text color="$gray10">{value}</Text>
                        </View>
                        {i !==
                          Object.entries(row).filter(
                            ([name]) =>
                              ![
                                'avatar',
                                'fullName',
                                'username',
                                'status',
                              ].includes(name),
                          ).length -
                            1 && <Separator />}
                      </>
                    );
                  })}
              </View>
            </View>
          );
        })}
      </YStack>
    );
  }

  return (
    <Table
      alignCells={{ x: 'center', y: 'center' }}
      alignHeaderCells={{ y: 'center', x: 'center' }}
      cellWidth="$18"
      cellHeight="$7"
      borderWidth={0}
      padding="$4"
      maxWidth={'100%'}
    >
      <Table.Head>
        {headerGroups.map((headerGroup) => {
          rowCounter.current++;
          return (
            <Table.Row
              rowLocation={
                rowCounter.current === 0
                  ? 'first'
                  : rowCounter.current === allRowsLenght - 1
                    ? 'last'
                    : 'middle'
              }
              key={headerGroup.id}
              justifyContent="flex-start"
            >
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell
                  cellLocation={
                    header.id === 'fullName'
                      ? 'first'
                      : header.id === 'role'
                        ? 'last'
                        : 'middle'
                  }
                  key={header.id}
                  borderWidth={0}
                  justifyContent="flex-start"
                  {...(header.column.id === 'user_base'
                    ? {
                        flexShrink: 1,
                      }
                    : {
                        flexShrink: 3,
                      })}
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
              hoverStyle={{
                backgroundColor: '$color2',
              }}
              rowLocation={
                rowCounter.current === 0
                  ? 'first'
                  : rowCounter.current === allRowsLenght - 1
                    ? 'last'
                    : 'middle'
              }
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  cellLocation={
                    cell.column.id === 'fullName'
                      ? 'first'
                      : cell.column.id === 'role'
                        ? 'last'
                        : 'middle'
                  }
                  key={cell.id}
                  borderWidth={0}
                  justifyContent="flex-start"
                  {...(cell.column.id === 'user_base'
                    ? {
                        flexShrink: 1,
                      }
                    : {
                        flexShrink: 3,
                      })}
                >
                  {cell.column.id === 'user_base' ? (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  ) : (
                    <Text theme="alt1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Text>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

UsersTable.fileName = 'UsersTable';
