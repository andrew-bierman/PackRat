import { StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// import useGetItems from "../hooks/useGetItems";


// import useEditItem from "../hooks/useEditItem";
// import useDeleteItem from "../hooks/useDeleteItem";

import { useState, useMemo, useEffect } from "react";
import { Box, Text, Input } from "native-base";

import { useDispatch, useSelector } from "react-redux";
import { deleteItem, editItem } from "../store/itemsStore";

import { Dimensions } from "react-native";

export const TableContainer = ({ currentPack }) => {
  // const { data, isLoading, isError, error } = useGetItems(packId);
  const dispatch = useDispatch();
  const data = currentPack?.items;

  const isLoading = useSelector((state) => state.items.isLoading);

  const error = useSelector((state) => state.items.error);

  const isError = error !== null;

  const [edit, setEdit] = useState();

  const totalBaseWeight = data?.reduce((acc, curr) => acc + curr.weight, 0);
  const totalWaterWeight = currentPack?.water ?? 0;
  const totalFoodWeight = currentPack?.food ?? 0;
  const totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  const tableData = {
    tableTitle: ["Pack List"],
    tableHead: [
      "Item Name",
      "Weight",
      "Quantity",
      "Delete",
      "Edit",
    ],

    tableData: data?.map((value) => Object.values(value).slice(1)),
    tableWater: ["Water", totalWaterWeight, "", "", ""],
    tableFood: ["Food", totalFoodWeight, "", "", ""],
    tableWaterFood: ["Water + Food", totalWaterWeight + totalFoodWeight, "", "", ""],
    tableTotal: ["Total", totalWeight, "", "", ""],
  };

  const flexWidthArr = [2, 1, 1, 0.5, 0.5];

  const tableDb = data?.map((value) => Object.values(value).slice(1, -1));
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
    setEdit((prevState) => [...prevState.slice(0, id), newRow, ...prevState.slice(id + 1)]);
  };

  // const { deleteItem } = useDeleteItem();
  // const { editItem } = useEditItem();

  if (isLoading) return <Text>Loading....</Text>;

  return (
    <Box
      style={styles.container}
    >
      {data?.length > 0 ? (
        <Table
          style={styles.tableStyle}
          borderStyle={{ borderColor: "transparent" }}
        >
          <Row data={tableData.tableTitle} style={styles.title} flexArr={flexWidthArr} />
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
                  style={[cellIndex === 3 || cellIndex === 4 ? styles.smallCell : styles.dataCell, {flex: flexWidthArr[cellIndex]}]}
                  data={
                    cellIndex === 3 ? (
                      isLoading ? (
                        <Text>Loading...</Text>
                      ) : (
                        <Feather
                          name="x-circle"
                          size={20}
                          color="black"
                          onPress={() => dispatch(deleteItem(data[index]._id))}
                          style={{ alignSelf: "center" }}
                        />
                      )
                    ) : cellIndex === 4 ? (
                      isLoading ? (
                        <Text>Loading...</Text>
                      ) : (
                        <MaterialIcons
                          name="edit"
                          size={20}
                          color="black"
                          onPress={() => dispatch(editItem(edit[index]))}
                        />
                      )
                    ) : (
                      // <Input
                      //   style={{ textAlign: "center", padding: 3 }}
                      //   value={String(cellData)}
                      //   onChangeText={(text) =>
                      //     handleEdit(index, text, cellIndex)
                      //   }
                      // />
                      String(cellData)
                    )
                  }
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      ) : (
        <Text>Add your First Item</Text>
      )}

      <Box
        style={styles.waterContainer}
      >
        <MaterialCommunityIcons
          name="water"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ marginRight: 20 }}>Water:</Text>
        <Input
          style={{ flex: 1 }}
          keyboardType="numeric"
          placeholder="Enter water weight"
          value={String(currentPack?.water ?? "")}
          onChangeText={handleWaterChange}
        />
      </Box>
      <Box
        style={styles.foodContainer}
      >
        <MaterialCommunityIcons
          name="food-apple"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ marginRight: 20 }}>Food:</Text>
        <Input
          style={{ flex: 1 }}
          keyboardType="numeric"
          placeholder="Enter food weight"
          value={String(currentPack?.food ?? "")}
          onChangeText={handleFoodChange}
        />
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
            <Text>{totalWeight}</Text>
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
    width: "90%",
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
    alignItems: 'center',
    justifyContent: 'center',
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
