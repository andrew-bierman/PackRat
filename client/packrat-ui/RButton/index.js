import { Button } from 'tamagui';
import useTheme from 'hooks/useTheme';

const RButton = (props) => {
  const { currentTheme } = useTheme();
  return (
    <Button {...props} backgroundColor={currentTheme.colors.secondaryBlue}>
      {props.children}
    </Button>
  );
};

export default RButton;
