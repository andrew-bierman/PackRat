import { View, ViewProps } from 'tamagui';

interface ExtendedViewProps extends ViewProps {
  paddingTop?: number;
}

export const MainContentWeb: React.FC<ExtendedViewProps> = (props) => (
  <View
    style={{
      paddingTop: 83,
    }}
    {...props}
  />
);
