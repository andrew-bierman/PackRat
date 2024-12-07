import React from 'react';
import { Box, Text } from 'native-base';

export function DetailsHeader({ type, item }) {
  return (
    <Box>
      <Text>DetailsHeader</Text>
      <Text>{type}</Text>
    </Box>
  );
}
