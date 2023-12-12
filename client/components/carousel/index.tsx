import React, { useRef, useState } from 'react';
import { ScrollView, Platform, Dimensions } from 'react-native';
import { VStack } from 'native-base';
import ScrollButton from './ScrollButton';
import useCustomStyles from '~/hooks/useCustomStyles';

const { height, width } = Dimensions.get('window');

const Carousel = ({ children = [], itemWidth }) => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = useCustomStyles(loadStyles);

  /**
   * Handles the scroll event.
   *
   * @param {object} event - The scroll event object.
   */
  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const newIndex = Math.round(contentOffset.x / itemWidth);
    setCurrentIndex(newIndex);
  };

  /**
   * Scrolls to the specified index.
   *
   * @param {number} index - The index to scroll to.
   */
  const scrollToIndex = (index) => {
    if (index >= 0 && index < children.length && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (itemWidth + 20),
        y: 0,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  return (
    <VStack
      style={{
        width: Platform.OS === 'web' ? '100%' : width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <ScrollButton
        direction="left"
        onPress={() => {
          scrollToIndex(currentIndex - 1);
        }}
        disabled={currentIndex === 0}
      />

      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={Platform.OS === 'web'}
        gestureEnabled={false} // Add this prop
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
      >
        {children &&
          children.map((child, index) => (
            <VStack
              key={index}
              style={{
                width: itemWidth + 10,
                marginRight: 10,
                marginTop: 10,
                flexDirection: 'row',
              }}
            >
              {child}
            </VStack>
          ))}
      </ScrollView>
      <ScrollButton
        direction="right"
        onPress={() => {
          scrollToIndex(currentIndex + 1);
        }}
        disabled={currentIndex === children?.length - 1}
      />
    </VStack>
  );
};

const loadStyles = () => ({
  carousel: {
    flexDirection: 'row',
    width: Platform.OS === 'web' ? '100%' : width * 0.8,
  },
});

export default Carousel;
