import React from "react";
import { Box, Center, Select, CheckIcon } from "native-base";

export const DropdownComponent = ({
  data,
  value,
  onValueChange,
  placeholder,
  width,
  style,
}) => {
  console.log("data in dropdown", data);

  return (
    <Center>
      <Box style={{...style, width: width || '100%'}}>
        <Select
          selectedValue={value}
          width="100%"
          accessibilityLabel="Choose Service"
          placeholder={placeholder || "Select"}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={onValueChange}
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
                  <Select.Item
                    key={index}
                    label={String(label)}
                    value={val}
                  />
                );
              })
            : null}
        </Select>
      </Box>
    </Center>
  );
};

export default DropdownComponent;
