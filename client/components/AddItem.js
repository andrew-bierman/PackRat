import { StyleSheet } from "react-native";
import { Box, Input, Button, Text } from "native-base";

import useAddItem from "../hooks/useAddItem";
import DropdownComponent from "./Dropdown";
import { theme } from "../theme";
import { useState } from "react";

import { addPackItem } from "../store/packsStore";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "./modal";

const data = ["oz", "lb", "g", "kg"];

export const AddItem = ({ packId }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  // const { addItem } = useAddItem();

  const isLoading = useSelector((state) => state.packs.isLoading);
  const error = useSelector((state) => state.packs.error);
  const isError = error !== null;

  const handleAddPackItem = async (item) => {
    dispatch(addPackItem({ name, weight, quantity, unit, packId }));

    setName("");
    setWeight("");
    setQuantity("");
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.mobileStyle}>
        <Input
          size="lg"
          value={name}
          variant="outline"
          placeholder="Item Name"
          onChangeText={(text) => setName(text)}
          width="100%"
        />
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            width: "100%",
          }}
        >
          <Input
            size="lg"
            value={weight}
            variant="outline"
            placeholder="Weight"
            onChangeText={(text) => setWeight(text)}
            flex={1}
          />
          {data && (
            <DropdownComponent data={data} setUnit={setUnit} width="120" />
          )}
        </Box>

        <Input
          size="lg"
          value={quantity}
          variant="outline"
          placeholder="Quantity"
          onChangeText={(text) => setQuantity(text)}
          width="100%"
        />
      </Box>
      <Button
        onPress={() => {
          // addItem.mutate({ name, weight, quantity, unit, packId });
          handleAddPackItem({ name, weight, quantity, unit, packId });
        }}
      >
        <Text style={{ color: theme.colors.text }}>
          {isLoading ? "Loading.." : "Add Item"}
        </Text>
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 18,
    gap: 20,
  },

  desktopStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 25,
    gap: 5,
    flex: 1,
    width: "50%",
  },

  mobileStyle: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    gap: 10,
  },

  input: {
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "grey",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    paddingVertical: 12,
  },
  btn: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 25,
    paddingVertical: 15,
    textAlign: "center",
    alignItems: "center",
    color: theme.colors.text,
    width: "50%",
  },
});
