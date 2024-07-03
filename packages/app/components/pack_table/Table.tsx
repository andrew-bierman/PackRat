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
import { useIsAuthUserPack } from 'app/hooks/packs/useIsAuthUserPack';
import { BasicTable } from '@packrat/ui/src/Bento/elements/tables';

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

  return (
    <View style={[styles.container]}>
      {data?.length ? (
        <>
          <BasicTable
            groupedData={groupedData}
            onDelete={deletePackItem}
            handleCheckboxChange={handleCheckboxChange}
            currentPack={currentPack}
            hasPermissions={isAuthUserPack}
            refetch={refetch}
            setRefetch={setRefetch}
          ></BasicTable>
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
