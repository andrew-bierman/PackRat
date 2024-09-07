import React, { useEffect, useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import { useProgressStore } from 'app/atoms/progressStore';
import { View } from '@packrat/ui';

const ProgressBarComponent = () => {
  const { currentTheme } = useTheme();
  const { targetValue } = useProgressStore();

  const [localCurrentValue, setLocalCurrentValue] = useState(0);
  const [operationId, setOperationId] = useState(0);

  useEffect(() => {
    // Generate a new operation ID
    const newOperationId = Math.random();
    setOperationId(newOperationId);

    // Reset local current value to start new progress
    setLocalCurrentValue(0);

    function incrementProgress() {
      if (localCurrentValue < targetValue && operationId === newOperationId) {
        setLocalCurrentValue((prevValue) => prevValue + 1);
      }
    }

    // Start the increment
    incrementProgress();
  }, [targetValue]);

  useEffect(() => {
    if (localCurrentValue < targetValue && operationId !== 0) {
      setLocalCurrentValue((prevValue) => prevValue + 1);
    }
  }, [localCurrentValue, targetValue, operationId]);

  return (
    <View
      style={{
        width: '100%',
        height: 4,
        backgroundColor: currentTheme.colors.background,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${(localCurrentValue / targetValue) * 100}%`,
          height: '100%',
          backgroundColor: currentTheme.colors.primary,
        }}
      />
    </View>
  );
};

export default ProgressBarComponent;
