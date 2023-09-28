import { Text, TextProps } from 'tamagui';
import { FC } from 'react';
type RText = {};
type RTextBase = RText & TextProps;

const RText: FC<RTextBase> = ({ children, style, ...props }) => {
  return (
    <Text style={[style]} fontFamily="$body" {...props}>
      {children}
    </Text>
  );
};

export default RText;
