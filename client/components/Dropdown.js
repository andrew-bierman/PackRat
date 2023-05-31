import React from "react";
import { useDispatch } from "react-redux";
import { addPark, addTrail } from "../store/parksStore";
import { Box, Center, Select } from "native-base";
import { CheckIcon } from "native-base";

export const DropdownComponent = ({
  data,
  setUnit,
  value,
  isTrail,
  width,
  style,
}) => {
  const dispatch = useDispatch();

  console.log("data in dropdown", data)

  return (
    <Center>
      <Box maxW={width} style={style}>
        <Select
          selectedValue={value}
          minWidth={setUnit ? "105" : "200"}
          accessibilityLabel="Choose Service"
          placeholder="Select"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={(itemValue) => {
            setUnit
              ? setUnit(itemValue)
              : isTrail
              ? dispatch(addTrail(itemValue))
              : dispatch(addPark(itemValue));
          }}
        >
          {data
            ? data?.map((item, index) => (
                <Select.Item key={`${item.id} + ${index}`} label={item.name} value={item.id || item._id || item.name} />
              ))
            : null}
        </Select>
      </Box>
    </Center>
  );
};

export default DropdownComponent;
