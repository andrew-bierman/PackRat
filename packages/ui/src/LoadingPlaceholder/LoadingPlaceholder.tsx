import { Animated } from 'react-native';
import { useCustomStyles } from '../styles';
import { useLoadingPlaceholder } from './useLoadingPlaceholder';

export const LoadingPlaceholder = ({
  width = '100%',
  height = 40,
  borderRadius = 5,
  color = '#CCC',
}) => {
  const fadeAnim = useLoadingPlaceholder();
  const styles = useCustomStyles(loadStyles);

  return (
    <Animated.View
      style={[
        styles.placeholder,
        {
          width,
          height,
          borderRadius,
          backgroundColor: color,
          opacity: fadeAnim,
        },
      ]}
    ></Animated.View>
  );
};

const loadStyles = () => ({
  placeholder: {
    marginVertical: 4,
  },
});
