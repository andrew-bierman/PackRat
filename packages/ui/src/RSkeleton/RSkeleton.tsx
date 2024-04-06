import { StyleSheet, Animated, Text } from 'react-native';
import { useSkeletonAnimation } from './useSkeletonAnimation';

export const RSkeleton = ({ style }) => {
  const fadeAnim = useSkeletonAnimation();

  const styles = StyleSheet.create({
    text: {
      fontSize: 24,
    },
  });
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e2e1eb',
        width: '100%',
        borderRadius: 4,
        ...style,
      }}
    >
      <Text style={styles.text}> </Text>
    </Animated.View>
  );
};
