import { useState } from 'react';

const useAppearance = () => {
  // Assume that the theme is initially set to light mode
  const [isEnabled, setIsEnabled] = useState(false);

  const currentTheme = {
    colors: {
      drawerIconColor: isEnabled ? '#ffffff' : '#000000',
    },
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return { isEnabled, toggleSwitch, currentTheme };
};

export default useAppearance;
