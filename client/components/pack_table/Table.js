import { StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { Feather } from "@expo/vector-icons";
import { Select, Checkbox, Box, Text } from "native-base";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../store/itemsStore";
import { convertWeight } from "../../utils/convertWeight";
import { EditPackItemModal } from "./EditPackItemModal";
import { ItemCategoryEnum } from "../../constants/itemCategory";
import Water from "../Water";

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
      <Text>{`${weight} (${unit})`}</Text>
    </Box>
  );
};

export const TableContainer = ({ currentPack }) => {
  const [weightUnit, setWeightUnit] = useState("g");
  const [checkedItems, setCheckedItems] = useState([]);

  const data = currentPack?.items;

  const isLoading = useSelector((state) => state.items.isLoading);
  const error = useSelector((state) => state.items.error);
  const isError = error !== null;

  const dispatch = useDispatch();

  let totalFoodWeight = 0;
  let totalWaterWeight = 0;
  let totalBaseWeight = 0;

  data &&
    data
      .filter((item) => !checkedItems.includes(item.name))
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
            break;
          }
        }
      });

  let totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  const handleCheckboxChange = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((checkedItem) => checkedItem !== item)
      );
    } else {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, item]);
    }
  };

  const tableData = data?.map(
    ({ name, weight, category, quantity, unit, _id }, index) => [
      name,
      `${weight} ${unit}`,
      quantity,
      `${category.name}`,
      <EditPackItemModal packId={_id} initialData={data[index]} />,
      <Feather
        name="x-circle"
        size={20}
        color="black"
        onPress={() => dispatch(deleteItem(_id))}
        style={{ alignSelf: "center" }}
      />,
      <Checkbox
        marginLeft="20"
        key={_id}
        isChecked={checkedItems.includes(name)}
        onChange={() => handleCheckboxChange(name)}
      />,
    ]
  );

  if (isLoading) return <Text>Loading....</Text>;

  return (
    <Box style={styles.container}>
      <WeightUnitDropdown value={weightUnit} onChange={setWeightUnit} />
      {tableData && tableData.length > 0 ? (
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
          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row} flexArr={[2, 1, 1, 0.5, 0.5]}>
              {rowData.map((cellData, cellIndex) => (
                <Cell key={cellIndex} data={cellData} />
              ))}
            </TableWrapper>
          ))}
        </Table>
      ) : (
        <Text>Add your First Item</Text>
      )}
      <Water currentPack={currentPack} />
      {tableData && tableData.length > 0 && (
        <>
          <TotalWeightBox label="Base Weight" weight={totalBaseWeight} unit={weightUnit} />
          <TotalWeightBox label="Water + Food Weight " weight={totalWaterWeight + totalFoodWeight} unit={weightUnit} />
          <TotalWeightBox label="Total Weight" weight={totalWeight} unit={weightUnit} />
        </>
      )}
      {isError ? <Text>{error}</Text> : null}
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
