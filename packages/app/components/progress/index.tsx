import React, { useEffect, useState } from 'react';
import { Progress } from 'native-base';
import useTheme from 'app/hooks/useTheme';
import { useProgressStore } from 'app/atoms/progressStore';

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
    <Progress
      value={localCurrentValue}
      colorScheme="success"
      size="sm"
      w="100%"
      borderRadius={0}
      bg={currentTheme.colors.background}
    />
  );
};

export default ProgressBarComponent;
