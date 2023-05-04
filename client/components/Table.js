import { StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// import useGetItems from "../hooks/useGetItems";

// import useEditItem from "../hooks/useEditItem";
// import useDeleteItem from "../hooks/useDeleteItem";

import { useState, useMemo, useEffect } from "react";
import { Box, Text, Input } from "native-base";

import { useDispatch, useSelector } from "react-redux";
import { deleteItem, editItem } from "../store/itemsStore";

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
    tableHead: ["Item Name", "Weight", "Quantity", "Delete", "Edit"],
    tableWaterFood: ["Water + Food", totalWaterWeight + totalFoodWeight, "", "", ""],
    tableTotal: ["Total", totalWeight, "", "", ""],
  };

  // const tableDb = useMemo(
  //   () => edit?.map((value) => Object.values(value).slice(1, -1)),
  //   [edit]
  // );
  // const tablekeys = useMemo(
  //   () => edit?.map((value) => Object.keys(value).slice(1)),
  //   [edit]
  // );

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

  // const handleEdit = (id, value, cellIndex) => {
  //   setEdit((prevState) => {
  //     return prevState.map((row, idx) => {
  //       if (id === idx) {
  //         return {
  //           ...row,
  //           [tablekeys[id][cellIndex]]: value,
  //         };
  //       } else {
  //         return row;
  //       }
  //     });
  //   });
  // };

  const handleEdit = (id, value, cellIndex) => {
    const newRow = { ...data[id], [tablekeys[id][cellIndex]]: value };
    setEdit((prevState) => [...prevState.slice(0, id), newRow, ...prevState.slice(id + 1)]);
  };


  // const { deleteItem } = useDeleteItem();
  // const { editItem } = useEditItem();

  if (isLoading) return <Text>Loading....</Text>;

  return (
    <Box
      style={{
        textAlign: "center",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {data?.length > 0 ? (
        <Table
          style={{
            width: "95%",
            gap: 15,
            textAlign: "center",
            alignItems: "center",
          }}
          borderStyle={{ borderColor: "transparent" }}
        >
          <Row data={tableData.tableHead} style={styles.head} />
          {tableDb.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
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
                      <Input
                        style={{ textAlign: "center", padding: 3 }}
                        value={String(cellData)}
                        onChangeText={(text) =>
                          handleEdit(index, text, cellIndex)
                        }
                      />
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

      <Box style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
        <Text style={{ marginRight: 20 }}>Water:</Text>
        <Input
          style={{ flex: 1 }}
          keyboardType="numeric"
          placeholder="Enter water weight"
          value={String(currentPack?.water ?? "")}
          onChangeText={handleWaterChange}
        />
      </Box>
      <Box style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
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
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});
