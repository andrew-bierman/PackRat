import { useState, useEffect } from 'react';
import { Animated, Text } from 'react-native';

const RSkeleton = ({style}) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity set to 0

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false, // Add this if you encounter any issues with native driver
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false, // Add this if you encounter any issues with native driver
          }),
        ]),
      ).start();
    };
    startAnimation();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e2e1eb',
        width: "100%",
        borderRadius: "4px",
        ...style
      }}
    >
      <Text style={{fontSize: "24px"}}>{' '}</Text>
    </Animated.View>
  );
};

export default RSkeleton;
