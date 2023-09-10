import { Text } from 'tamagui';

const RText = ({ children, style, ...props }) => {
  return (
    <Text style={[style]} fontFamily="$body" {...props}>
      {children}
    </Text>
  );
};

export default RText;
