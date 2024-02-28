import React from 'react';
import { View, Text } from 'react-native';

interface DetailsHeaderProps {
  type: any;
  item: any;
}
export const DetailsHeader: React.FC<DetailsHeaderProps> = ({ type, item }) => {
  return (
    <View>
      <Text>DetailsHeader</Text>
      <Text>{type}</Text>
    </View>
  );
};
