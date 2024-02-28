import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useLoadingPlaceholder = () => {
  const fadeAnim = useRef(new Animated.Value(0.5));

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim.current, {
      toValue: 0.8,
      duration: 800,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim.current, {
      toValue: 0.5,
      duration: 800,
      useNativeDriver: true,
    });

    Animated.loop(Animated.sequence([fadeIn, fadeOut])).start();

    return () => {
      fadeIn.stop();
      fadeOut.stop();
    };
  }, []);

  return fadeAnim.current;
};
