import React from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  type TextStyle,
  type ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onPress: (index: any) => void;
  disabled: boolean;
}

const ScrollButton = ({ direction, onPress, disabled }: ScrollButtonProps) => {
  const styles = useCustomStyles(loadStyles);
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.scrollButton}
      disabled={disabled}
    >
      {direction === 'left' && (
        <Text style={[styles.iconStyles, { color: isDark ? 'white' : 'grey' }]}>
          &lang;
        </Text>
      )}
      {direction != 'left' && (
        <Text style={[styles.iconStyles, { color: isDark ? 'white' : 'grey' }]}>
          &rang;
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Define the styles type
interface ScrollButtonStyles {
  container: ViewStyle;
  scrollButton: ViewStyle;
  iconStyles: TextStyle;
}

// Define the function signature for loadStyles
type LoadStyles = () => ScrollButtonStyles;

const loadStyles: LoadStyles = () => ({
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
