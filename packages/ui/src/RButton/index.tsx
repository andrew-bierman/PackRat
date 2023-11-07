import { Button } from 'tamagui';
// import useTheme from '~/hooks/useTheme';

const RButton = (props: any) => {
  // const { currentTheme } = useTheme();
  return (
    // <Button {...props} backgroundColor={currentTheme.colors.secondaryBlue}>
    <Button {...props} backgroundColor="secondaryBlue">
      {props.children}
    </Button>
  );
};

export default RButton;
