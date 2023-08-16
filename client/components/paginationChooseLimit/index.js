import { View, Text } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Select } from "native-base";

export const PaginationLimit = ({ limit, setLimit, setPage }) => {
  return (
    <View style={styles.selectContainer}>
      <Select
        selectedValue={limit}
        accessibilityLabel="choose the number of items to be displayed"
        placeholder="Choose a value"
        onValueChange={(itemValue) => {
          setLimit(itemValue);
          setPage(1);
        }}
      >
        <Select.Item key={"item 1"} label="10" value="10" />
        <Select.Item key={"item 2"} label="20" value="20" />
        <Select.Item key={"item 3"} label="50" value="50" />
      </Select>
    </View>
  );
};
const styles = StyleSheet.create({
  selectContainer: {
    width: "15rem",
    marginLeft: "auto",
    marginRight: "2rem",
  },
});
