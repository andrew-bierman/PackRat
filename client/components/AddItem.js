import { StyleSheet } from "react-native";
import { Box, Input, Button, Text } from "native-base";

import useAddItem from "../hooks/useAddItem";
import DropdownComponent from "./Dropdown";
import { theme } from "../theme";
import { useState } from "react";
import axios from "axios";
import { api } from "../constants/api";

const data = ["oz", "lb", "g", "kg"];

export const AddItem = ({ packId }) => {
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [addItemArr, setAddItemArr] = useState([1]);
  const [searchText, setSearchText] = useState('');

  const { addItem } = useAddItem();

  const addTextInput = () => {
    setAddItemArr([...addItemArr, 1]);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    searchFunction(text);
  };

  const searchFunction = async (inputValue) => {
    // filter or search data based on the inputValue
    const response = await axios.get(`${api}/item/search?name=${inputValue}`);
    console.log("data log here", response);
  };


  return (
    <Box style={styles.container}>
      <Box style={styles.mobileStyle}>
        <Input
          size="lg"
          value={searchText}
          onChangeText={handleSearchTextChange}
          variant="outline"
          placeholder="Search for Item"
          width="100%"
        />

      </Box>

      <Box style={{ gap: 10 }}>
        <Box style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 7 }}>
          <Text fontWeight={'medium'} fontSize={14}> Item Name</Text>
          <Text fontWeight={'medium'} fontSize={14}>Weight</Text>
        </Box>
        {addItemArr?.map((_item, index) => {
          return (
            <Box
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: 10
              }}
            >
              <Input
                size="lg"
                value={weight}
                variant="outline"
                placeholder="Item Name"
                onChangeText={(text) => setWeight(text)}
                flex={1}
              />
              <Input
                value={weight}
                variant="outline"
                placeholder="Weight"
                onChangeText={(text) => setWeight(text)}
                flex={1}
              />
            </Box>
          )
        })}

      </Box>


      <Button
        width={40}
        onPress={() => {
          addTextInput()
          // addItem.mutate({ name, weight, quantity, unit, packId });
          // setName("");
          // setQuantity("");
          // setWeight("");
        }}
      >
        <Text style={{ color: theme.colors.text }}>
          {addItem.isLoading ? "Loading.." : "Add Item"}
        </Text>
      </Button>

      {/* Base Weight component */}

      <Box style={{ gap: 10 }}>
        <Text fontWeight={'bold'} fontSize={18}>Base Weight</Text>
        <Box style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 7 }}>
          <Text fontWeight={'medium'} fontSize={14}>Water + Food</Text>
          <Text fontWeight={'medium'} fontSize={14}>Weight</Text>
        </Box>
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 10
          }}
        >
          <Input
            size="lg"
            value={weight}
            variant="outline"
            placeholder="Water"
            onChangeText={(text) => setWeight(text)}
            flex={1}
          />
          <Input
            value={weight}
            variant="outline"
            placeholder="1 L"
            onChangeText={(text) => setWeight(text)}
            flex={1}
          />
        </Box>
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 10
          }}
        >
          <Input
            size="lg"
            value={weight}
            variant="outline"
            placeholder="Food"
            onChangeText={(text) => setWeight(text)}
            flex={1}
          />
          <Input
            value={weight}
            variant="outline"
            placeholder="1 KG"
            onChangeText={(text) => setWeight(text)}
            flex={1}
          />
        </Box>
      </Box>

      <Button
        width={40}
        onPress={() => {
          // addTextInput()
          // addItem.mutate({ name, weight, quantity, unit, packId });
          // setName("");
          // setQuantity("");
          // setWeight("");
        }}
      >
        <Text style={{ color: theme.colors.text }}>
          {addItem.isLoading ? "Loading.." : "Save Pack"}
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
