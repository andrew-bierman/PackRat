import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Progress } from 'native-base';
import useTheme from '~/hooks/useTheme';
import useProgressBar from '~/hooks/progress/useProgressBar';

const ProgressBarComponent = () => {
  const { currentTheme } = useTheme();
  const { localCurrentValue } = useProgressBar();
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
