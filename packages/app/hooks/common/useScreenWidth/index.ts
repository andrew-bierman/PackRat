import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const onResize = (event) => {
      setScreenWidth(event.window.width);
    };
    const subscription = Dimensions.addEventListener('change', onResize);
    return () => subscription.remove();
  }, []);

  const isLessThanScreenWidth = (size: number) => {
    return screenWidth < size;
  };

  return { screenWidth, isLessThanScreenWidth };
};
