import React from 'react';
import { Text as TamaguiText } from '@tamagui/core';

// Define your own Text component with default styles that can be overridden[4]
const Text = ({ style, ...props }) => {
  return <TamaguiText style={[defaultStyles, style]} {...props} />;
};

const defaultStyles = {
  fontSize: 16,
  color: 'black', 
  lineHeight: 24,
};

export default Text;