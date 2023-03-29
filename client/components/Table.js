import { StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import useGetItems from "../hooks/useGetItems";

import useEditItem from "../hooks/useEditItem";
import useDeleteItem from "../hooks/useDeleteItem";

import { useState, useMemo, useEffect } from "react";
import { Box, Text, Input } from "native-base";

export const TableContainer = ({ packId }) => {
  const { data, isLoading, isError, error } = useGetItems(packId);
  const [edit, setEdit] = useState();

  const totalWeight = data?.reduce((acc, curr) => acc + curr.weight, 0);

  const tableData = {
    tableHead: ["Item Name", "Weight", "Quantity", "Delete", "Edit"],
  };

  const tableDb = useMemo(
    () => edit?.map((value) => Object.values(value).slice(1, -1)),
    [edit]
  );
  const tablekeys = useMemo(
    () => edit?.map((value) => Object.keys(value).slice(1)),
    [edit]
  );

  useEffect(() => {
    setEdit(data);
  }, [data]);

  const handleEdit = (id, value, cellIndex) => {
    setEdit((prevState) => {
      return prevState.map((row, idx) => {
        if (id === idx) {
          return {
            ...row,
            [tablekeys[id][cellIndex]]: value,
          };
        } else {
          return row;
        }
      });
    });
  };

  const { deleteItem } = useDeleteItem();
  const { editItem } = useEditItem();

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
      {edit?.length > 0 ? (
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
                      deleteItem.isLoading ? (
                        <Text>Loading...</Text>
                      ) : (
                        <Feather
                          name="x-circle"
                          size={20}
                          color="black"
                          onPress={() => deleteItem.mutate(data[index]._id)}
                          style={{ alignSelf: "center" }}
                        />
                      )
                    ) : cellIndex === 4 ? (
                      editItem.isLoading ? (
                        <Text>Loading...</Text>
                      ) : (
                        <MaterialIcons
                          name="edit"
                          size={20}
                          color="black"
                          onPress={() => editItem.mutate(edit[index])}
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

      {edit?.length > 0 && (
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
