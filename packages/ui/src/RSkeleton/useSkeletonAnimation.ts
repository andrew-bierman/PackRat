import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const useSkeletonAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim.current, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false, // Add this if you encounter any issues with native driver
        }),
        Animated.timing(fadeAnim.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false, // Add this if you encounter any issues with native driver
        }),
      ]),
    ).start();
  }, []);

  return fadeAnim.current;
};
