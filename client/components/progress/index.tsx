import { Progress } from 'native-base';
import useProgressBarComponent from '~/hooks/progress';

const ProgressBarComponent = () => {

  const {
    localCurrentValue,
    currentTheme
  } = useProgressBarComponent()

  
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
