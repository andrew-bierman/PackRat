import { Button } from 'tamagui';
import useTheme from '~/hooks/useTheme';

const RButton = ({children, backgroundColor, ...props}) => {
  const { currentTheme } = useTheme();
  const bg = backgroundColor ? backgroundColor : currentTheme.colors.secondaryBlue;
  return (
    <Button backgroundColor={bg} color={"white"} {...props}>
      {children}
    </Button>
  );
};

export default RButton;
