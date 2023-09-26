import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import useCustomStyles from '~/hooks/useCustomStyles';

const LoadingPlaceholder = ({
  width = '100%',
  height = 40,
  borderRadius = 5,
  color = '#CCC',
}) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity
  const styles = useCustomStyles(loadStyles);

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 0.8,
      duration: 800,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 800,
      useNativeDriver: true,
    });

    Animated.loop(Animated.sequence([fadeIn, fadeOut])).start();

    return () => {
      fadeIn.stop();
      fadeOut.stop();
    };
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.placeholder,
        {
          width,
          height,
          borderRadius,
          backgroundColor: color,
          opacity: fadeAnim,
        },
      ]}
    ></Animated.View>
  );
};

const loadStyles = () => ({
  placeholder: {
    marginVertical: 4,
  },
});

export default LoadingPlaceholder;
