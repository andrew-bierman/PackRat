import { View, ViewProps } from 'tamagui';

interface ExtendedViewProps extends ViewProps {
  paddingTop?: number;
}

export const MainContentWeb: React.FC<ExtendedViewProps> = (props) => (
  <View
    style={{
      paddingTop: 83,
      paddingLeft: 16,
      paddingRight: 16,
    }}
    {...props}
  />
);
