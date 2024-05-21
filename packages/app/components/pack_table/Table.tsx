import React from 'react';
import { RButton, RSkeleton, RStack, RText } from '@packrat/ui';
import { Platform, View, Text } from 'react-native';
import { usePackTable } from 'app/hooks/packs/usePackTable';
import useCustomStyles from 'app/hooks/useCustomStyles';
import loadStyles from './packtable.style';
import {
  TotalWeightBox,
  WeightUnitDropdown,
  ErrorMessage,
  CategoryRow,
  TitleRow,
} from './TableHelperComponents';
import TableItem from './TableItem';
import { useDeletePackItem } from 'app/hooks/packs/useDeletePackItem';
import { Tables } from '@packrat/ui';
const { SortableTable, createColumnHelper } = Tables;
interface Pack {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  unit: string;
  category: {
    name: string;
  };
}

const columnHelper = createColumnHelper<Pack>();

interface TableContainerProps {
  currentPack: any;
  selectedPack: any;
  refetch: () => void;
  setRefetch: () => void;
  copy: boolean;
  hasPermissions: boolean;
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
  const headerRow = ['Item Name', `Weight`, 'Quantity', ''];
  let flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];
  const { deletePackItem } = useDeletePackItem();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.category.name, {
      id: 'category',
      header: 'Category',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('weight', {
      header: 'Weight',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('unit', {
      header: 'Unit',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity',
      cell: (info) => info.getValue(),
    }),
  ];

  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    window.innerWidth < 900
  ) {
    flexArr = [1, 1, 1, 1];
  }
  if (isLoading) return <RSkeleton style={{}} />;
  if (error) return <ErrorMessage message={error} />;
  const isWeb = Platform.OS === 'web';

  return (
    <View style={[styles.container, { width: '100%' }]}>
      {data?.length ? (
        <>
          <SortableTable columns={columns} data={data} />
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
        </>
      ) : (
        <RText style={styles.noItemsText}>Add your First Item</RText>
      )}
      <WeightUnitDropdown value={weightUnit} onChange={setWeightUnit} />
    </View>
  );
};

export default TableContainer;
