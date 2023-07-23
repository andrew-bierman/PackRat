import React from "react";
import { Box, Center, Select, CheckIcon } from "native-base";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export const DropdownComponent = ({
  data,
  value,
  onValueChange,
  icon,
  iconPosition,
  ItemStyle,
  ItemTextStyle,
  SelectTextStyle,
  SelectStyle,
  placeholder,
  width,
  style,
}) => {
  console.log("data in dropdown", style);

  return (
    <Center>
    
           <SelectDropdown
            data={data}
          defaultValue={value}
           
            onSelect={(item, index) => onValueChange(item)}
            defaultButtonText={placeholder||"Select"}
            buttonTextAfterSelection={(category, index) => {
              return category;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={style?{...style,width:width||'100%'}:{...styles.buttonStyle,width:width||'100%'}}
            buttonTextStyle={SelectTextStyle}
            renderDropdownIcon={isOpened => {
              return (icon?icon:
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#BDC3C4'}
                 

                  size={14}
                />
              );
            }}
            dropdownIconPosition={iconPosition?iconPosition:'right'}
            dropdownStyle={SelectStyle?SelectStyle:styles.dropdownStyle}
            rowStyle={ItemStyle?ItemStyle:styles.rowStyle}
            rowTextStyle={ItemTextStyle?ItemTextStyle:styles.rowTextStyle}
          />
    
    {/* <Box style={{...style, width: width || '100%'}}>
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
      </Box> */}
    </Center>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
   backgroundColor:'white',borderWidth:1,borderColor:'gray',borderRadius:10,height:40
  },
  dropdownStyle:{
    borderRadius:10,
    backgroundColor:'white'
  },
  rowTextStyle:{

  },
  rowStyle:{
    paddingVertical:10,
  }
});

export default DropdownComponent;