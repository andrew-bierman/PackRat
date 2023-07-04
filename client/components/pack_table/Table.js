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
      alignItems: "center",
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

const TableItem = ({ itemData, checkedItems, handleCheckboxChange, index }) => {
  const { name, weight, category, quantity, unit, _id } = itemData;
  const dispatch = useDispatch();

  return (
    <TableWrapper
      key={index}
      style={styles.row}
      flexArr={[2, 1, 1, 0.3, 0.3, 0.3, 0.3]}
    >
      {[
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
      ].map((cellData, cellIndex) => (
        <Cell key={cellIndex} data={cellData} />
      ))}
    </TableWrapper>
  );
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
          >
            <Row data={["Pack List"]} style={styles.title} />
            <Row
              data={[
                "Item Name",
                `Weight`,
                "Quantity",
                "Category",
                "Edit",
                "Delete",
                "Ignore",
              ].map((header, index) => (
                <Cell key={index} data={header} />
              ))}
              style={styles.head}
            />
            {data.map((item, index) => (
              <TableItem
                key={index}
                itemData={item}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                index={index}
              />
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
        <Text>Add your First Item</Text>
      )}
    </Box>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tableStyle: {
    width: "95%",
    gap: 15,
    textAlign: "center",
    alignItems: "center",
  },
  title: {
    height: 40,
    backgroundColor: "#f1f8ff",
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 20,
  },
  head: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: 25,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 25,
    marginVertical: 30,
    flex: 1,
  },
});

export default TableContainer;
