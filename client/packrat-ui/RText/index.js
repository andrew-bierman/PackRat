import { Text } from 'tamagui';

const PRText = ({ children, style, ...props }) => {
  return (
    <Text style={[style]} fontFamily="$body" {...props}>
      {children}
    </Text>
  );
};

export default PRText;
