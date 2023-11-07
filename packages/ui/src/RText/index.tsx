import { Text } from 'tamagui';

interface PRTextProps {
  children: any;
  style?: any;
  [key: string]: any;  // This line allows for additional props which will be forwarded to Text component
}

const PRText: React.FC<PRTextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[style]} fontFamily="$body" {...props}>
      {children}
    </Text>
  );
};

export default PRText;
