import React, { useEffect, useState } from 'react';
import { useSelector } from '../redux/useSelector';

const useProgressBar = () => {
  const reduxTargetValue = useSelector((state) => state.progress.targetValue);
  const [localCurrentValue, setLocalCurrentValue] = useState(0);
  const [operationId, setOperationId] = useState(0);

  useEffect(() => {
    // Generate a new operation ID
    const newOperationId = Math.random();
    setOperationId(newOperationId);

    // Reset local current value to start new progress
    setLocalCurrentValue(0);

    function incrementProgress() {
      if (
        localCurrentValue < reduxTargetValue &&
        operationId === newOperationId
      ) {
        setLocalCurrentValue((prevValue) => prevValue + 1);
      }
    }

    // Start the increment
    incrementProgress();
  }, [reduxTargetValue]);

  useEffect(() => {
    if (localCurrentValue < reduxTargetValue && operationId !== 0) {
      setLocalCurrentValue((prevValue) => prevValue + 1);
    }
  }, [localCurrentValue, reduxTargetValue, operationId]);

  return { localCurrentValue };
};

export default useProgressBar;
