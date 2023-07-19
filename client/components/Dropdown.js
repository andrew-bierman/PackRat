import React from "react";
import { Box, Center, Select, CheckIcon } from "native-base";
import { Picker } from "@react-native-picker/picker"

export const DropdownComponent = ({
  data,
  value,
  onValueChange,
  placeholder,
  width,
  style,
}) => {
  // console.log("data in dropdown", data);

  return (
    <Center>
      <Box style={{ ...style, width: width || '100%' }}>
        <Picker
          selectedValue={value}
          width="100%"
          onValueChange={onValueChange}
          placeholder={placeholder || "Select"}
          accessibilityLabel="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          {data
            ? data?.map((item, index) => {
              let val = item;
              let label = item;
              // Check if the item is an object
              if (typeof item === 'object' && item !== null) {
                val = item.id || item._id || item.name;
                label = item.name;
              }
              return (
                <Picker.Item key={index} label={String(label)} value={val} />

              );
            })
            : null}
        </Picker>
      </Box>
    </Center>
  );
};

export default DropdownComponent;