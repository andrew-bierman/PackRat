import React from 'react';
import { Box } from 'native-base';

const NativeBaseBox = () => (
  <Box
    alignSelf="center"
    _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'amber.100',
      letterSpacing: 'lg',
    }}
    p={4}
    bg={['primary.500']}
  >
    This is a Box from Native Base
  </Box>
);

export default NativeBaseBox;
