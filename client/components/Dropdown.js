import React from "react";
import { addPark, addTrail } from "../store/dropdownStore";
import { useDispatch } from "react-redux";
import { Select, Center, Box, CheckIcon, Text } from "native-base";

export const DropdownComponent = ({
  data,
  setUnit,
  value,
  isTrail,
  width,
  style,
}) => {
  const dispatch = useDispatch();

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
            ? data?.map((value, id) => (
                <Select.Item key={id} label={value} value={value} />
              ))
            : null}
        </Select>
      </Box>
    </Center>
  );
};

export default DropdownComponent;
