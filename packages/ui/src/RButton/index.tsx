import { Button } from 'tamagui';
// import useTheme from '~/hooks/useTheme';

const RButton = (props) => {
  // const { currentTheme } = useTheme();
  return (
    // <Button {...props} backgroundColor={currentTheme.colors.secondaryBlue}>
    <Button {...props}>  
      {props.children}
    </Button>
  );
};

export default RButton;
