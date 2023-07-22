import React from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export const DropdownComponent = ({
  data,
  value,
  onValueChange,
  placeholder,
  width,
  style,
}) => {
  console.log('data in dropdown ------->', data)
  const items = data?.map((item, index) => {
    let val = item;
    let label = item;
    // Check if the item is an object
    if (typeof item === 'object' && item !== null) {
      val = item.id || item._id || item.name;
      label = item.name;
    }
    return { label: String(label), value: val };
  }) || [];

  return (
    <View style={{ ...styles.container, ...style, width: width || '100%'}}>
      <DropDownPicker
        // items={[{label: placeholder || "Select", value: null}, ...items]}
        items={items}
        defaultValue={value}
        value={value}
        containerStyle={styles.dropDownContainer}
        style={styles.dropDown}
        itemStyle={styles.item}
        dropDownStyle={styles.dropDownStyle}
        labelStyle={styles.label}
        activeLabelStyle={styles.activeLabel}
        onChangeItem={item => onValueChange(item.value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingHorizontal: 20,
  },
  dropDownContainer: {
    height: 50, 
    borderRadius: 5
  },
  dropDown: {
    backgroundColor: '#fafafa', 
    borderBottomColor: '#000', 
    borderBottomWidth: 0.5
  },
  item: {
    justifyContent: 'flex-start',
    padding: 10,
    marginVertical: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  dropDownStyle: {
    backgroundColor: '#fafafa', 
    marginTop: 2
  },
  label: {
    fontSize: 16, 
    color: '#000'
  },
  activeLabel: {
    color: '#00BFFF'
  },
});

export default DropdownComponent;
