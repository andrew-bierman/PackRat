import { StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Select } from "native-base";

// import useGetItems from "../hooks/useGetItems";

// import useEditItem from "../hooks/useEditItem";
// import useDeleteItem from "../hooks/useDeleteItem";

import { useState, useMemo, useEffect } from "react";
import { Box, Text, Input } from "native-base";

import { useDispatch, useSelector } from "react-redux";
import { editItem, deleteItem } from "../../store/itemsStore";

import { convertWeight } from "../../utils/convertWeight";
import { selectPackById } from "../../store/packsStore";

export const TableContainer = ({ currentPack }) => {
  // const { data, isLoading, isError, error } = useGetItems(packId);

  const dispatch = useDispatch();

  const data = currentPack?.items;

  const isLoading = useSelector((state) => state.items.isLoading);

  const error = useSelector((state) => state.items.error);

  const isError = error !== null;

  const [edit, setEdit] = useState();

  // PREFERED WEIGHTING UNIT FOR DISPLAY TO CLIENTSIDE
  const [weightUnit, setWeightUnit] = useState("g");
  const calculate = (value) => {
    return currentPack?.items?.reduce((acc, item) => {
      const convertedWeight = convertWeight(
        item?.weight,
        item?.unit,
        weightUnit
      );
      const result = acc + convertedWeight * item.quantity;
      return result;
    }, 0);
  };

  const totalItemsWeight = useMemo(
    () => calculate(currentPack),
    [currentPack, weightUnit]
  );

  // UI component
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

  const handleWeightChange = (value, index) => {
    const newItem = { ...data[index], weight: value };
    const convertedWeight = convertWeight(value, weightUnit, "lb");
    setData((prevState) => [
      ...prevState.slice(0, index),
      newItem,
      ...prevState.slice(index + 1),
    ]);
  };

  const totalBaseWeight = data?.reduce((acc, curr) => acc + curr.weight, 0);
  const totalWaterWeight = currentPack?.water ?? 0;
  const totalFoodWeight = currentPack?.food ?? 0;
  const totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  const tableData = {
    tableTitle: ["Pack List"],
    tableHead: [
      "Item Name",
      `Weight`,
      // `Weight (${weightUnit})`,
      "Quantity",
      "Edit",
      "Delete",
    ],
    tableBaseData: data?.map((value) => Object.values(value).slice(1)),
    tableWater: ["Water", totalWaterWeight, "", "", ""],
    tableFood: ["Food", totalFoodWeight, "", "", ""],
    tableWaterFood: [
      "Water + Food",
      totalWaterWeight + totalFoodWeight,
      "",
      "",
      "",
    ],
    tableTotal: ["Total", totalWeight, "", "", ""],
  };

  const flexWidthArr = [2, 1, 1, 0.5, 0.5];

  const tableDb = data?.map(({ name, weight, unit, quantity, _id }, index) => [
    name,
    `${weight} ${unit}`,
    quantity,
    <MaterialIcons
      name="edit"
      size={20}
      color="black"
      onPress={() => setEdit(index)}
    />,
    <Feather
      name="x-circle"
      size={20}
      color="black"
      onPress={() => deleteItem.mutate(_id)}
      style={{ alignSelf: "center" }}
    />,
  ]);

  console.log("tableDb", tableDb);

  const tablekeys = data?.map((value) => Object.keys(value).slice(1));

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const handleWaterChange = (value) => {
    // Update the water value in the currentPack
  };

  const handleFoodChange = (value) => {
    // Update the food value in the currentPack
  };

  const handleEdit = (id, value, cellIndex) => {
    const newRow = { ...data[id], [tablekeys[id][cellIndex]]: value };
    setData((prevState) => [
      ...prevState.slice(0, id),
      newRow,
      ...prevState.slice(id + 1),
    ]);
  };

  if (isLoading) return <Text>Loading....</Text>;

  return (
    <Box style={styles.container}>
      <WeightUnitDropdown value={weightUnit} onChange={setWeightUnit} />
      {data?.length > 0 ? (
        <Table
          style={styles.tableStyle}
          borderStyle={{ borderColor: "transparent" }}
        >
          <Row
            data={tableData.tableTitle}
            style={styles.title}
            flexArr={flexWidthArr}
          />
          <Row
            data={tableData.tableHead.map((header, index) => (
              <Cell key={index} data={header} />
            ))}
            style={styles.head}
            flexArr={flexWidthArr}
          />
          {tableDb.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row} flexArr={flexWidthArr}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  style={[
                    cellIndex === 3 || cellIndex === 4
                      ? styles.smallCell
                      : styles.dataCell,
                    { flex: flexWidthArr[cellIndex] },
                  ]}
                  data={cellData}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      ) : (
        <Text>Add your First Item</Text>
      )}

      <Box style={styles.waterContainer}>
        <MaterialCommunityIcons
          name="water"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ marginRight: 20 }}>Water:</Text>
        <Input
          style={{ flex: 1, placeholderTextColor: "#000" }}
          keyboardType="numeric"
          placeholder="Enter water weight"
          value={String(currentPack?.water ?? "")}
          onChangeText={handleWaterChange}
        />
        <Text style={{ marginLeft: 20 }}>({weightUnit})</Text>
      </Box>
      <Box style={styles.foodContainer}>
        <MaterialCommunityIcons
          name="food-apple"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ marginRight: 20 }}>Food:</Text>
        <Input
          style={{ flex: 1, placeholderTextColor: "#000" }}
          keyboardType="numeric"
          placeholder="Enter food weight"
          value={String(currentPack?.food ?? "")}
          onChangeText={handleFoodChange}
        />
        <Text style={{ marginLeft: 20 }}>({weightUnit})</Text>
      </Box>

      {data?.length > 0 && (
        <>
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
            <Text>Items Weight</Text>
            <Text>{totalItemsWeight}</Text>
          </Box>
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
            <Text>Base Weight</Text>
            <Text>{totalBaseWeight}</Text>
          </Box>
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
            <Text>Water + Food Weight</Text>
            <Text>{totalWaterWeight + totalFoodWeight}</Text>
          </Box>
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
            <Text>Total Weight</Text>
            <Text>{`${totalWeight} (${weightUnit})`}</Text>
          </Box>
        </>
      )}
      {isError ? <Text>{error}</Text> : null}
    </Box>
  );
};

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

  editDeleteHead: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
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

  dataCell: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  smallCell: {
    // width: 50,
    // flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  specialRow: {
    flexDirection: "row",
    width: "100%",
    height: 25,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",

    gap: 10,
  },

  waterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingLeft: 15,
    backgroundColor: "#78B7BB",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },

  foodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingLeft: 15,
    backgroundColor: "#78B7BB",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },

  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});
