import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Table, Row, Cell, TableWrapper } from "react-native-table-component";
import { theme } from "../../theme";
import { Box, Button, HStack, Input, Select } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";
import { EditPackItemModal } from "../pack_table/EditPackItemModal";
import { DeletePackItemModal } from "../pack_table/DeletePackItemModal";
import { PaginationLimit } from "../paginationChooseLimit";
export const ItemsTable = ({ limit, setLimit, page, setPage }) => {
  const flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];
  const data = useSelector((state) => state.globalItems);
  const isLoading = useSelector((state) => state.globalItems.isLoading);

  const TitleRow = ({ title }) => {
    const rowData = [
      <HStack style={styles.mainTitle}>
        <Text style={styles.titleText}>{title}</Text>
      </HStack>,
    ];

    return (
      <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
    );
  };
  const TableItem = ({ itemData, index }) => {
    const { name, weight, category, quantity, unit } = itemData;

    const rowData = [
      name || "a",
      `${formatNumber(weight || 0)} ${unit || "c"}`,
      quantity,
      `${category?.name || "d"}`,
      <EditPackItemModal />,
      <DeletePackItemModal itemId="1bc" />,
    ];

    return <Row data={rowData} style={styles.row} flexArr={flexArr} />;
  };

  return (
    <Box
      style={{
        marginTop: "2rem",
      }}
    >
      <Table
        style={styles.tableStyle}
        borderStyle={{ borderColor: "transparent" }}
      >
        <TitleRow title="Global Items List" />
        <Row
          flexArr={flexArr}
          data={[
            "Item Name",
            `Weight`,
            "Quantity",
            "Category",
            "Edit",
            "Delete",
          ].map((header, index) => (
            <Cell key={index} data={header} textStyle={styles.headerText} />
          ))}
          style={styles.head}
        />
        {/* { {!isLoading && */}
        {/* // data && // data.globalItems && // data.globalItems.items && // */}
        {/* Array.isArray(data.globalItems.items) && */}
        {["a", "b", "c", "d"].map((item, index) => (
          <TableItem key={index} itemData={item} />
        ))}
      </Table>
      <PaginationLimit limit={limit} setLimit={setLimit} />
      <Box style={{ display: "flex", flexDirection: "row", margin: "auto" }}>
        <Button
          style={{
            marginRight: "10px",
            width: "4px",
            backgroundColor: "transparent",
            borderRadius: "5px",
            borderColor: "#0284c7",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          disabled={page === 0}
          onPress={() => {
            console.log("pressed", page);
            setPage(page - 1);
          }}
        >
          <Text style={{ color: "#0284c7" }}>{"<"}</Text>
        </Button>
        <Button
          style={{
            marginRight: "10px",
            width: "4px",
            backgroundColor: "transparent",
            borderRadius: "5px",
            borderColor: "#0284c7",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          onPress={() => {
            console.log("pressed", page);
            setPage(page + 1);
          }}
        >
          <div style={{ color: "#0284c7" }}>{">"}</div>
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  tableStyle: {
    width: "100%",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  mainTitle: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryRow: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-start",
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
