import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Input, Text, Box } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ItemCategoryEnum } from "../constants/itemCategory";
import { useDispatch } from "react-redux";
import { addPackItem } from "../store/packsStore";

export default function Water({ currentPack, setWaterItem }) {
  const [waterWeight, setWaterWeight] = useState(0);
  const dispatch = useDispatch();

  const handleWaterChange = (value) => {
    setWaterWeight(value);
  };

  const addWater = () => {
    const data = {
      name: "Water",
      weight: waterWeight,
      quantity: "1",
      unit: "oz",
      packId: currentPack["_id"],
      type: ItemCategoryEnum.WATER,
    };
    
    dispatch(addPackItem(data));
  };

  return (
    <Box style={styles.waterContainer}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
          type="number"
          placeholder="Enter water"
          value={String(currentPack?.water ?? waterWeight)}
          onChangeText={handleWaterChange}
        />
        <Text style={{ marginLeft: 20 }}>(Oz)</Text>
      </Box>
      <Button style={{ width: "8rem" }} onPress={addWater}>
        Add
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  waterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
    backgroundColor: "#78B7BB",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },
});
