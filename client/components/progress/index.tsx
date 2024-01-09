import { Progress } from 'native-base';
import useProgressBarComponent from '~/hooks/progress';
import useTheme from '~/hooks/useTheme';

const ProgressBarComponent = () => {

  const {currentTheme} = useTheme()

  const {localCurrentValue} = useProgressBarComponent()

  
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
