// import React from "react";

// import { View, StyleSheet } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";

// import { Box, Center, Select, CheckIcon } from "native-base";
// import SelectDropdown from "react-native-select-dropdown";
// import { FontAwesome } from "@expo/vector-icons";

// export const DropdownComponent = ({
//   data,
//   value,
//   onValueChange,
//   icon,
//   iconPosition,
//   ItemStyle,
//   ItemTextStyle,
//   SelectTextStyle,
//   SelectStyle,
//   placeholder,
//   width,
//   style,
// }) => {
//   //

//   const items =
//   data?.map((item, index) => {
//     let val = item;
//     let label = item;
//     // Check if the item is an object
//     if (typeof item === "object" && item !== null) {
//       val = item.id || item.id || item.name;
//       label = item.name;
//     }
//     return { label: String(label), value: val };
//   }) || [];

//   const dummyItems = [
//     { label: "Item 1", value: "item1" },
//     { label: "Item 2", value: "item2" },
//     { label: "Item 3", value: "item3", selectable: false },
//   ];

//   return (
//     <View style={{ ...styles.container, ...style, width: width || "100%" }}>
//       <DropDownPicker
//         // items={dummyItems}
//         items={[{label: placeholder || "Select", value: null}, ...items]}
//         // items={items}
//         schema={{
//           label: 'label', // required
//           value: 'value', // required
//           icon: 'icon',
//           parent: 'parent',
//           selectable: 'selectable',
//           disabled: 'disabled',
//           testID: 'testID',
//           containerStyle: 'containerStyle',
//           labelStyle: 'labelStyle'
//         }}
//         defaultValue={value || null}
//         value={value || null}
//         placeholder={placeholder || "Select"}
//         containerStyle={styles.dropDownContainer}
//         style={styles.dropDown}
//         itemStyle={styles.item}
//         dropDownStyle={styles.dropDownStyle}
//         labelStyle={styles.label}
//         activeLabelStyle={styles.activeLabel}
//         onChangeItem={(item) => onValueChange(item.value)}
//         />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexGrow: 1,
//     width: "100%",
//   },
//   content: {
//     flexGrow: 1,
//     justifyContent: "flex-start",
//     alignItems: "stretch",
//     paddingHorizontal: 20,
//   },
//   dropDownContainer: {
//     height: 50,
//     borderRadius: 5,
//   },
//   dropDown: {
//     backgroundColor: "#fafafa",
//     borderBottomColor: "#000",
//     borderBottomWidth: 0.5,
//   },
//   item: {
//     justifyContent: "flex-start",
//     padding: 10,
//     marginVertical: 2,
//     borderBottomColor: "#ccc",
//     borderBottomWidth: 0.5,
//   },
//   dropDownStyle: {
//     backgroundColor: "#fafafa",
//     marginTop: 2,
//   },
//   label: {
//     fontSize: 16,
//     color: "#000",
//   },
//   activeLabel: {
//     color: "#00BFFF",
//   },
// });

// export default DropdownComponent;

import { RSelect } from '@packrat/ui';
import React from 'react';
import { View, Platform } from 'react-native';

interface DropdownComponentProps {
  width?: string | number;
  style?: any;
  placeholder?: any;
  native?: boolean;
  // zeego?: boolean;
  [x: string]: any; // for the rest of the props
}

export const DropdownComponent: React.FC<DropdownComponentProps> = ({
  width,
  style = {},
  placeholder,
  // zeego = false,
  ...props
}) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <RSelect
        placeholder={placeholder || 'Select'}
        native={!isWeb}
        // zeego={zeego}
        {...props}
      />
    </View>
  );
};

export default DropdownComponent;
