import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
  triggerButton: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  menuContent: {
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  menuTitle: {
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
});

export default function MyDropdownMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <TouchableOpacity style={styles.triggerButton}>
          <Text>Open Menu</Text>
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={styles.menuContent}>
        <DropdownMenu.Item key="item1">
          <DropdownMenuItem title="Item 1" icon="md-home" />
        </DropdownMenu.Item>
        <DropdownMenuItem title="Item 2" icon="md-settings" />
        <DropdownMenuItem title="Item 3" icon="md-information-circle" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function DropdownMenuItem({ title, icon }) {
  return (
    <DropdownMenu.Item key={title}>
      <View style={styles.menuItem}>
        <Ionicons name={icon} size={20} style={styles.icon} />
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
    </DropdownMenu.Item>
  );
}

// export default function MyDropdownMenu() {
//   return (
//     <DropdownMenu.Root>
//       <DropdownMenu.Trigger asChild>
//         <TouchableOpacity>
//           <Text>Open Menu</Text>
//         </TouchableOpacity>
//       </DropdownMenu.Trigger>
//       <DropdownMenu.Content>
//         <DropdownMenu.Item key="item1">
//           <DropdownMenu.ItemTitle>Item 1</DropdownMenu.ItemTitle>
//         </DropdownMenu.Item>
//         <DropdownMenu.Item key="item2">
//           <DropdownMenu.ItemTitle>Item 2</DropdownMenu.ItemTitle>
//         </DropdownMenu.Item>
//         <DropdownMenu.Item key="item3">
//           <DropdownMenu.ItemTitle>Item 3</DropdownMenu.ItemTitle>
//         </DropdownMenu.Item>
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   );
// }
