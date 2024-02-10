import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useEffect } from 'react';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const onResize = (event) => {
      setScreenWidth(event.window.width);
    };
    Dimensions.addEventListener('change', onResize);
    return () => Dimensions.removeEventListener('change', onResize);
  }, []);

  const isLessThanScreenWidth = (size: number) => {
    return screenWidth < size;
  };

  return { screenWidth, isLessThanScreenWidth };
};
