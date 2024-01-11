import { Feather } from '@expo/vector-icons';
import { RButton, RCheckbox, RSkeleton, RStack, RText } from '@packrat/ui';
import { useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { Cell, Row, Table } from 'react-native-table-component';
import { usePackTable } from '~/hooks/packs/usePackTable';
import useCustomStyles from '~/hooks/useCustomStyles';
import useTheme from '~/hooks/useTheme';
import DropdownComponent from '../Dropdown';
import { PackOptions } from '../PackOptions';
import { DeletePackItemModal } from './DeletePackItemModal';
import { EditPackItemModal } from './EditPackItemModal';
import { categoryIcons } from '~/constants/pack/icons';
import { formatNumber } from '~/utils/formatNumber';

const WeightUnitDropdown = ({ value, onChange }) => {
  return (
    <DropdownComponent
      value={value}
      accessibilityLabel="Select weight unit"
      placeholder="Select weight unit"
      onValueChange={(itemValue) => onChange(itemValue)}
      data={['kg', 'g', 'lb', 'oz']}
    />
  );
};

const TotalWeightBox = ({ label, weight, unit }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <View style={styles.totalWeightBox}>
      <RText>{label}</RText>
      <RText>{`${formatNumber(weight)} (${unit})`}</RText>
    </View>
  );
};

const IgnoreItemCheckbox = ({ itemId, isChecked, handleCheckboxChange }) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}
  >
    <RCheckbox
      id={itemId}
      value="Ignore Item"
      checked={isChecked}
      onCheckedChange={() => handleCheckboxChange(itemId)}
      aria-label="Ignore item"
    />
  </View>
);

const ErrorMessage = ({ message }) => <RText>{message}</RText>;

const TableItem = ({
  itemData,
  checkedItems,
  handleCheckboxChange,
  index,
  flexArr,
  currentPack,
  refetch,
  setRefetch = () => {},
}) => {
  const { name, weight, quantity, unit, _id } = itemData;
  const styles = useCustomStyles(loadStyles);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  /**
   * Executes the onTrigger function.
   *
   * @param {None} None - No parameters required.
   * @return {None} No return value.
   */
  const onTrigger = () => {
    setIsEditModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsEditModalOpen(false);
  };

  let rowData = [];
  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    window.innerWidth < 900
  ) {
    rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      <PackOptions
        Edit={
          <EditPackItemModal
            packId={_id}
            initialData={itemData}
            currentPack={currentPack}
            refetch={refetch}
            setRefetch={setRefetch}
            onTrigger={onTrigger}
            isModalOpen={isEditModalOpen}
            closeModalHandler={closeModalHandler}
          />
        }
        Delete={
          <DeletePackItemModal
            itemId={_id}
            pack={currentPack}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        }
        Ignore={
          <IgnoreItemCheckbox
            itemId={_id}
            isChecked={checkedItems.includes(_id)}
            handleCheckboxChange={handleCheckboxChange}
          />
        }
        editTrigger={onTrigger}
      />,
    ];
  } else {
    rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      <EditPackItemModal
        packId={_id}
        initialData={itemData}
        currentPack={currentPack}
        refetch={refetch}
        setRefetch={setRefetch}
        onTrigger={onTrigger}
        isModalOpen={isEditModalOpen}
        closeModalHandler={closeModalHandler}
      />,
      <DeletePackItemModal
        itemId={_id}
        pack={currentPack}
        refetch={refetch}
        setRefetch={setRefetch}
      />,
      <IgnoreItemCheckbox
        itemId={_id}
        isChecked={checkedItems.includes(_id)}
        handleCheckboxChange={handleCheckboxChange}
      />,
    ];
  }

  /*
  * this _id is passed as pack id but it is a item id which is confusing
  Todo need to change the name for this passing argument and remaining functions which are getting it
   */

  // Here, you can set a default category if item.category is null or undefined
  return <Row data={rowData} style={styles.row} flexArr={flexArr} />;
};

const CategoryRow = ({ category }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  const rowData = [
    <RStack style={{ flexDirection: 'row', gap: 8, ...styles.categoryRow }}>
      <Feather
        name={categoryIcons[category]}
        size={16}
        color={currentTheme.colors.white}
      />
      <RText fontSize="$2" style={styles.titleText}>
        {' '}
        {category}
      </RText>
    </RStack>,
  ];

  return (
    <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
  );
};

const TitleRow = ({ title }) => {
  const styles = useCustomStyles(loadStyles);
  const rowData = [
    <RStack style={{ flexDirection: 'row', ...styles.mainTitle }}>
      <RText fontSize="$2" style={styles.titleText}>
        {title}
      </RText>
    </RStack>,
  ];

  return (
    <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
  );
};

export const TableContainer = ({
  currentPack,
  selectedPack,
  refetch,
  setRefetch = () => {},
  copy,
}) => {
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

  let flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];
  let heading = [
    'Item Name',
    'Weight',
    'Quantity',
    'Edit',
    'Delete',
    `${copy ? 'Copy' : 'Ignore'}`,
  ];
  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    window.innerWidth < 900
  ) {
    flexArr = [1, 1, 1, 1];
    heading = ['Item Name', 'Weight', 'Quantity', 'Options'];
  }
  if (isLoading) return <RSkeleton style={{}} />;
  if (error) return <ErrorMessage message={error} />;
  return (
    <View style={styles.container}>
      {data?.length ? (
        <>
          <Table style={styles.tableStyle} flexArr={flexArr}>
            <TitleRow title="Pack List" />
            <Row
              flexArr={flexArr}
              data={[
                'Item Name',
                `Weight`,
                'Quantity',
                'Category',
                'Edit',
                'Delete',
                `${copy ? 'Copy' : 'Ignore'}`,
              ].map((header, index) => (
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
                    data={items}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({ item }) => (
                      <TableItem
                        itemData={item}
                        checkedItems={checkedItems}
                        handleCheckboxChange={handleCheckboxChange}
                        flexArr={flexArr}
                        currentPack={currentPack}
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
      <WeightUnitDropdown value={weightUnit} onChange={setWeightUnit} />
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      flex: 1,
      padding: 10,
      width: Platform.OS === 'web' ? '100%' : 310,
    },
    tableStyle: {
      width: Platform.OS === 'web' ? '100%' : 300,
      marginVertical: 20,
    },
    mainTitle: {
      marginTop: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    categoryRow: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      height: 50,
      backgroundColor: currentTheme.colors.primary,
      borderRadius: 10,
      justifyContent: 'center',
      paddingLeft: 15,
    },
    titleText: {
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    head: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.border,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    headerText: {
      fontWeight: 'bold',
      color: '#000000',
      fontSize: Platform.OS === 'web' ? 12 : 8,
    },
    row: {
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      backgroundColor: currentTheme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.border,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 25,
      backgroundColor: currentTheme.colors.white,
    },
    noItemsText: {
      fontWeight: 'bold',
      fontSize: 16,
      margin: 20,
      textAlign: 'center',
    },
    totalWeightBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Platform.OS === 'web' ? '100%' : 300,
      paddingHorizontal: 25,
      marginVertical: 30,
      flex: 1,
    },
  };
};

export default TableContainer;
