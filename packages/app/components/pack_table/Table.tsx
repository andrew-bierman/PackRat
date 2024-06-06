import { RButton, RCheckbox, RSkeleton, RStack, RText } from '@packrat/ui';
import { FlatList, Platform, View } from 'react-native';
import { Cell, Row, Table } from 'react-native-table-component';
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

  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    window.innerWidth < 900
  ) {
    flexArr = [1, 1, 1, 1];
  }
  if (isLoading) return <RSkeleton style={{}} />;
  if (error) return <ErrorMessage message={String(error)} />;
  const isWeb = Platform.OS === 'web';

  return (
    <View style={[styles.container, !isWeb && { width: '100%' }]}>
      {data?.length ? (
        <>
          <Table style={styles.tableStyle} flexArr={flexArr}>
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
                        hasPermissions={hasPermissions}
                        refetch={refetch}
                        setRefetch={setRefetch}
                      />
                    )}
                  />
                </>
              )}
            />
          </Table>
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
      <WeightUnitDropdown
        value={weightUnit}
        onChange={(itemValue: string) => setWeightUnit(itemValue as any)}
      />
    </View>
  );
};

export default TableContainer;
