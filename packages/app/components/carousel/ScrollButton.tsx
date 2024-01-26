import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface ScrollButtonProps {
  direction: "left" | "right";
  onPress: (index: any) => void;
  disabled: boolean;
}

const ScrollButton = ({ direction, onPress, disabled }: ScrollButtonProps) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.scrollButton}
      disabled={disabled}
    >
      {direction === 'left' && <Text style={styles.iconStyles}>&lang;</Text>}
      {direction != 'left' && <Text style={styles.iconStyles}>&rang;</Text>}
    </TouchableOpacity>
  );
};

const loadStyles = () => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyles: {
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default ScrollButton;
