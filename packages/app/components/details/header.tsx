import React from 'react';
import { View, Text } from 'react-native';

export function DetailsHeader({ type, item }) {
  return (
    <View>
      <Text>DetailsHeader</Text>
      <Text>{type}</Text>
    </View>
  );
}
