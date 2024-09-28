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
import { AddItem } from 'app/modules/item';
import { MaterialIcons } from '@expo/vector-icons';
import { EditPackItemModal } from 'app/modules/pack';
import { RText } from '@packrat/ui';

import RIconButton from '../../../RIconButton';
import { BaseAlert } from '@packrat/ui';
import { useProfile } from 'app/modules/user/hooks';
import { useAuthUser } from 'app/modules/auth';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from 'app/modules/item/constants';
import { ActionsDropdownComponent } from '@packrat/ui';

type ModalName = 'edit' | 'delete';

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

interface optionValues {
  label: string;
  value: string;
}

interface BasicTableProps {
  groupedData: GroupedData;
  handleCheckboxChange: (itemId: string) => void;
  onDelete: (params: { itemId: string; packId: string }) => void;
  hasPermissions: boolean;
  currentPack: any;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

/** ------ EXAMPLE ------ */
export function BasicTable({
  groupedData,
  onDelete,
  hasPermissions,
  currentPack,
  refetch,
  setRefetch,
}: BasicTableProps) {
  const user = useAuthUser();
  console.log('user', user);
  const ActionButtons = ({ item }) => {
    const [activeModal, setActiveModal] = React.useState<ModalName | null>(
      null,
    );
    const [selectedItemId, setSelectedItemId] = React.useState<string | null>(
      null,
    );

    const openModal = (modalName: ModalName, itemId: string) => {
      setActiveModal(modalName);
      setSelectedItemId(itemId);
    };

    const closeModal = () => {
      setActiveModal(null);
      setSelectedItemId(null);
    };

    const handleActionsOpenChange = (state) => {
      switch (state) {
        case 'Edit':
          openModal('edit', item.id);
          break;
        case 'Delete':
          openModal('delete', item.id);
          break;
      }
    };

    const optionValues: optionValues[] = [
      { label: 'Edit', value: 'Edit' },
      { label: 'Delete', value: 'Delete' },
    ];

    return (
      <>
        <EditPackItemModal
          isOpen={activeModal === 'edit'}
          onClose={closeModal}
          triggerComponent={null}
          showTrigger={false}
        >
          {selectedItemId === item.id && (
            <AddItem
              id={item.id}
              packId={item.id}
              isEdit={true}
              initialData={item}
            />
          )}
        </EditPackItemModal>
        <BaseAlert
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
          hideIcon={true}
          title={'Delete Item'}
          footerButtons={[
            {
              label: 'Cancel',
              onClick: () => {
                closeModal();
              },
              color: 'gray',
              disabled: false,
            },
            {
              label: 'Delete',
              onClick: () => {
                closeModal();
                onDelete({ itemId: item.id, packId: currentPack.id });
              },
              color: '#B22222',
              disabled: false,
            },
          ]}
        >
          <RText> Are you sure you want to delete this item?</RText>
        </BaseAlert>

        {hasPermissions ? (
          <View
            style={{
              minWidth: 50,
              maxWidth: 100,
            }}
          >
            <ActionsDropdownComponent
              value={null}
              data={optionValues}
              onValueChange={(value) => handleActionsOpenChange(value)}
              native={true}
            />
          </View>
        ) : null}
      </>
    );
  };

  const columnHelper = createColumnHelper<Item>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: () => 'Name',
      // footer: (info) => info.column.id,
    }),
    // columnHelper.accessor('weight', {
    //   cell: (info) => info.getValue(),
    //   header: () => 'Weight',
    //   // footer: (info) => info.column.id,
    // }),
    columnHelper.accessor('weight', {
      cell: (info) => {
        const weightInGrams = info.getValue();

        const preferredWeight = convertWeight(
          weightInGrams,
          SMALLEST_ITEM_UNIT,
          info.row.original.unit as any,
        );
        return preferredWeight;
      },
      header: () => 'Weight',
    }),
    columnHelper.accessor('quantity', {
      header: () => 'Quantity',
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor('category.name', {
      header: () => 'Category',
      cell: (info) => info.getValue(),
      // footer: (info) => 'category',
    }),
  ];

  if (hasPermissions) {
    columns.push(
      columnHelper.display({
        id: 'actions',
        cell: (props) => <ActionButtons item={props.row.original} />,
        header: () => 'Actions',
      }),
    );
  }

  const CELL_WIDTH = '$18';

  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  // Flatten the grouped data into a single array of items
  const data = Object.values(groupedData).flat();

  const [tableData, setTableData] = React.useState<Item[]>(data);
  React.useEffect(() => {
    setTableData(Object.values(groupedData).flat());
    setActiveModal(null);
  }, [groupedData]);
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
      <View alignItems="center" justifyContent="center" width="100%" gap="$5">
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
                if (name === 'ownerId' || name === 'id') {
                  return null;
                }
                const finalValue =
                  name === 'weight'
                    ? convertWeight(value, SMALLEST_ITEM_UNIT, row.unit)
                    : value;
                return (
                  <View key={name} fd="row" justifyContent="space-between">
                    <Text>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                    {name === 'category' ? (
                      <Text color="$gray10">{String(value?.name)}</Text>
                    ) : (
                      <Text color="$gray10">{String(finalValue)}</Text>
                    )}
                  </View>
                );
              })}
              {hasPermissions && (
                <View
                  fd="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>Action</Text>
                  <ActionButtons item={row} />
                </View>
              )}
            </View>
          </View>
        ))}
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
        maxWidth={getTokenValue(CELL_WIDTH) * columns.length}
      >
        <Table.Head>
          {headerGroups.map((headerGroup) => (
            <Table.Row
              backgrounded
              backgroundColor="$color2"
              key={headerGroup.id}
            >
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
          ))}
        </Table.Head>
        <Table.Body>
          {tableRows.map((row) => (
            <Table.Row key={row.id}>
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
    </View>
  );
}

BasicTable.fileName = 'Basic';
