import { Animated, Text } from 'react-native';
import { useSkeletonAnimation } from './useSkeletonAnimation';

export const RSkeleton = ({ style }) => {
  const fadeAnim = useSkeletonAnimation();

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e2e1eb',
        width: '100%',
        borderRadius: '4px',
        ...style,
      }}
    >
      <Text style={{ fontSize: '24px' }}> </Text>
    </Animated.View>
  );
};
