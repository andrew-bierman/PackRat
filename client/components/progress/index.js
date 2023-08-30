import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Button, Progress } from 'tamagui';
import { ProgressBar } from 'react-native-paper';
import {
  setCurrentProgress,
  setTargetProgress,
  resetProgress,
} from '../../store/progressStore';
import useTheme from '~/hooks/useTheme';

const ProgressBarComponent = () => {
  const { isDark, isLight, currentTheme } = useTheme();
  const dispatch = useDispatch();
  const reduxTargetValue = useSelector((state) => state.progress.targetValue);

  // Using local state for immediate UI feedback.
  const [localCurrentValue, setLocalCurrentValue] = useState(0);

  useEffect(() => {
    if (localCurrentValue !== reduxTargetValue) {
      const intervalId = setInterval(() => {
        const step = (reduxTargetValue - localCurrentValue) * 0.05;
        const newValue = localCurrentValue + step;
        setLocalCurrentValue(newValue);

        // If the difference between target and current is negligible, set current to target
        if (Math.abs(reduxTargetValue - localCurrentValue) < 1) {
          setLocalCurrentValue(reduxTargetValue);
          clearInterval(intervalId);
        }
      }, 0); // Reduced the interval for faster updates

      return () => clearInterval(intervalId);
    }
  }, [localCurrentValue, reduxTargetValue]);

  return (
    <ProgressBar
      progress={localCurrentValue}
      style={{
        backgroundColor: currentTheme.colors.background,
        borderRadius: 0,
      }}
    />
  );
};

export default ProgressBarComponent;
