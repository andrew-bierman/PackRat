import React from 'react';
import { RButton, RSkeleton, RText } from '@packrat/ui';
import { View } from 'react-native';
import { useDeletePackItem, useIsAuthUserPack } from 'app/modules/pack';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './packtable.style';
import {
  TotalWeightBox,
  WeightUnitDropdown,
  ErrorMessage,
} from './TableHelperComponents';
import { usePackTable } from './usePackTable';
import { BasicTable } from '@packrat/ui/src/Bento/elements/tables';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

import ActionButtons from './ActionButtons';
import { type Item } from 'app/modules/item';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from 'app/modules/item/constants';

interface TableContainerProps {
  currentPack: any;
  selectedPack?: any;
  refetch?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  copy?: boolean;
  hasPermissions?: boolean;
}

export const TableContainer = ({
  currentPack,
  selectedPack,
  hasPermissions,
  refetch,
  setRefetch = () => {},
  copy,
}: TableContainerProps) => {
  const styles = useCustomStyles(loadStyles);
  const isAuthUserPack = useIsAuthUserPack(currentPack);
  const {
    isLoading,
    error,
    data,
    groupedData,
    checkedItems,
    handleCheckboxChange,
    handleDuplicate,
    totalBaseWeight,
    totalFoodWeight,
    totalWaterWeight,
    totalWeight,
    weightUnit,
    setWeightUnit,
  } = usePackTable({
    currentPack,
    selectedPack,
    refetch,
    setRefetch,
    copy,
  });
  const { deletePackItem } = useDeletePackItem();

  if (isLoading) return <RSkeleton style={{}} />;
  if (error) return <ErrorMessage message={String(error)} />;

  const columnHelper = createColumnHelper<Item>();
  const columns: ColumnDef<Item, any>[] = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: () => 'Name',
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor('weight', {
      cell: (info) =>
        convertWeight(
          info.getValue(),
          SMALLEST_ITEM_UNIT,
          info.row.original.unit as any,
        ),
      header: () => 'Weight',
      // footer: (info) => info.column.id,
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (hasPermissions) {
    columns.push(
      columnHelper.display({
        id: 'actions',
        cell: (props) => (
          <ActionButtons
            item={props.row.original}
            onDelete={deletePackItem}
            currentPack={currentPack}
          />
        ),
        header: () => 'Actions',
      }),
    );
  }

  const headerGroup = table.getHeaderGroups()[0];
  const tableRows = table.getRowModel().rows;
  const footerGroup = table.getFooterGroups()[0];

  return (
    <View style={[styles.container]}>
      {data?.length ? (
        <>
          <BasicTable
            headerGroup={headerGroup}
            tableRows={tableRows}
            footerGroup={footerGroup}
            columnsLength={columns.length}
          />
          {/* <Table style={styles.tableStyle} flexArr={flexArr}>
            <TitleRow title="Pack List" />
            <Row
              flexArr={flexArr}
              data={headerRow.map((header, index) => (
                <Cell key={index} data={header} textStyle={styles.headerText} />
              ))}
              style={styles.head}
            />
            <FlatList
              data={Object.entries(groupedData)}
              keyExtractor={([category, items]) => category}
              renderItem={({ item: [category, items] }) => (
                <>
                  <CategoryRow category={category} />
                  <FlatList
                    data={Array.isArray(items) ? items : []} // Ensure items is an array
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                      <TableItem
                        itemData={item}
                        onDelete={deletePackItem}
                        handleCheckboxChange={handleCheckboxChange}
                        flexArr={flexArr}
                        currentPack={currentPack}
                        hasPermissions={isAuthUserPack}
                        refetch={refetch}
                        setRefetch={setRefetch}
                      />
                    )}
                  />
                </>
              )}
            />
          </Table> */}
          {copy ? (
            <RButton
              style={{
                width: 300,
                marginHorizontal: 'auto',
                marginTop: 10,
              }}
              onPress={handleDuplicate}
            >
              Copy
            </RButton>
          ) : null}
          <TotalWeightBox
            label="Base Weight"
            weight={totalBaseWeight}
            unit={weightUnit}
          />
          <TotalWeightBox
            label="Water + Food Weight"
            weight={totalWaterWeight + totalFoodWeight}
            unit={weightUnit}
          />
          <TotalWeightBox
            label="Total Weight"
            weight={totalWeight}
            unit={weightUnit}
          />
          <WeightUnitDropdown
            value={weightUnit}
            onChange={(itemValue: string) => setWeightUnit(itemValue as any)}
          />
        </>
      ) : (
        <RText style={styles.noItemsText}>Add your First Item</RText>
      )}
    </View>
  );
};
