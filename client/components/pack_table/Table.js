import { StyleSheet } from "react-native";
import { Table, Row, Cell, TableWrapper } from "react-native-table-component";
import { Feather } from "@expo/vector-icons";
import { Select, Checkbox, Box, Text } from "native-base";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertWeight } from "../../utils/convertWeight";
import { EditPackItemModal } from "./EditPackItemModal";
import { ItemCategoryEnum } from "../../constants/itemCategory";
import Water from "../Water";
import { DeletePackItemModal } from "./DeletePackItemModal";
import { formatNumber } from "../../utils/formatNumber";
import { theme } from "../../theme";

const WeightUnitDropdown = ({ value, onChange }) => {
  return (
    <Select
      selectedValue={value}
      accessibilityLabel="Select weight unit"
      placeholder="Select weight unit"
      onValueChange={(itemValue) => onChange(itemValue)}
    >
      <Select.Item label="Kg Kilogram" value="kg" />
      <Select.Item label="G Gram" value="g" />
      <Select.Item label="Lb Pound" value="lb" />
      <Select.Item label="Oz Ounce" value="oz" />
    </Select>
  );
};

const TotalWeightBox = ({ label, weight, unit }) => {
  return (
    <Box
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 25,
        marginVertical: 30,
        flex: 1,
      }}
    >
      <Text>{label}</Text>
      <Text>{`${formatNumber(weight)} (${unit})`}</Text>
    </Box>
  );
};

const IgnoreItemCheckbox = ({ itemId, isChecked, handleCheckboxChange }) => (
  <Box
    style={{
      justifyContent: "center",
      alignItems: "flex-start",
    }}
  >
    <Checkbox
      key={itemId}
      isChecked={isChecked}
      onChange={() => handleCheckboxChange(itemId)}
    />
  </Box>
);

const Loading = () => <Text>Loading....</Text>;

const ErrorMessage = ({ message }) => <Text>{message}</Text>;

const TableItem = ({
  itemData,
  checkedItems,
  handleCheckboxChange,
  index,
  flexArr,
}) => {
  const { name, weight, category, quantity, unit, _id } = itemData;
  const dispatch = useDispatch();

  const rowData = [
    name,
    `${formatNumber(weight)} ${unit}`,
    quantity,
    `${category.name}`,
    <EditPackItemModal packId={_id} initialData={itemData} />,
    <DeletePackItemModal itemId={_id} />,
    <IgnoreItemCheckbox
      itemId={_id}
      isChecked={checkedItems.includes(_id)}
      handleCheckboxChange={handleCheckboxChange}
    />,
  ];

  return <Row data={rowData} style={styles.row} flexArr={flexArr} />;
};

export const TableContainer = ({ currentPack }) => {
  const [weightUnit, setWeightUnit] = useState("g");
  const [checkedItems, setCheckedItems] = useState([]);
  const isLoading = useSelector((state) => state.items.isLoading);
  const error = useSelector((state) => state.items.error);

  const data = currentPack?.items;

  let totalFoodWeight = 0;
  let totalWaterWeight = 0;
  let totalBaseWeight = 0;

  let waterItem;
  data &&
    data
      .filter((item) => !checkedItems.includes(item._id))
      .forEach((item) => {
        switch (item.category.name) {
          case ItemCategoryEnum.ESSENTIALS: {
            totalBaseWeight += convertWeight(
              item.weight * item.quantity,
              item.unit,
              weightUnit
            );
            break;
          }
          case ItemCategoryEnum.FOOD: {
            totalFoodWeight += convertWeight(
              item.weight * item.quantity,
              item.unit,
              weightUnit
            );
            break;
          }
          case ItemCategoryEnum.WATER: {
            totalWaterWeight += convertWeight(
              item.weight * item.quantity,
              item.unit,
              weightUnit
            );
            waterItem = item;
            break;
          }
        }
      });

  console.log("waterItem", waterItem);

  let totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Group items by category
  const groupedData = data?.reduce((acc, item) => {
    (acc[item.category.name] = acc[item.category.name] || []).push(item);
    return acc;
  }, {});

  const flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Box style={styles.container}>
      <WeightUnitDropdown value={weightUnit} onChange={setWeightUnit} />
      {data?.length ? (
        <>
          <Table
            style={styles.tableStyle}
            borderStyle={{ borderColor: "transparent" }}
            flexArr={flexArr}
          >
            <Row
              data={["Pack List"]}
              style={styles.title}
              textStyle={styles.titleText}
            />
            <Row
              flexArr={flexArr}
              data={[
                "Item Name",
                `Weight`,
                "Quantity",
                "Category",
                "Edit",
                "Delete",
                "Ignore",
              ].map((header, index) => (
                <Cell key={index} data={header} textStyle={styles.headerText} />
              ))}
              style={styles.head}
            />
            {Object.entries(groupedData).map(([category, items]) => (
              <>
                <Row data={[`${category}`]} style={styles.title} 
                textStyle={styles.titleText}
                />
                {items.map((item, index) => (
                  <TableItem
                    key={index}
                    itemData={item}
                    checkedItems={checkedItems}
                    handleCheckboxChange={handleCheckboxChange}
                    index={index}
                    flexArr={flexArr}
                  />
                ))}
              </>
            ))}
          </Table>
          <Water currentPack={currentPack} />
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
        <Text style={styles.noItemsText}>Add your First Item</Text>
      )}
    </Box>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F8F8F8",
    width: "100%",
  },
  tableStyle: {
    width: "100%",
    marginVertical: 20,
  },
  title: {
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 15,
  },
  titleText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  head: {
    height: 50,
    backgroundColor: "#F3F4F6",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#000000",
  },
  row: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    backgroundColor: "#F8F8F8",
  },
  noItemsText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});

export default TableContainer;
