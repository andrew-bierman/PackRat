import { View, StyleSheet, ViewProps } from 'react-native';

interface ContainerProps extends ViewProps {}

export const Container = ({ style, ...props }: ContainerProps) => {
  return (
    <View {...props} style={[containerStyles.container, style]} {...props} />
  );
};

const containerStyles = StyleSheet.create({
  container: {
    maxWidth: 1140,
    width: '100%',
    margin: 'auto',
  },
});
