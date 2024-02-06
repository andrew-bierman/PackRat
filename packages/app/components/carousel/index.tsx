import React, { useContext, useState } from 'react';
import { ScrollView, Platform, Dimensions } from 'react-native';
import { VirtualList, RStack } from '@packrat/ui';
import ScrollButton from './ScrollButton';
import { ListRefContext } from '../../context/ListRef';

const { height, width } = Dimensions.get('window');

const Carousel = ({ children = [], itemWidth }) => {
  const scrollViewRef = useContext(ListRefContext);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <RStack
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children && <VirtualList data={children} itemWidth={itemWidth} />}
      </ScrollView>
      <ScrollButton
        direction="right"
        onPress={() => {
          scrollToIndex(currentIndex + 1);
        }}
        disabled={currentIndex === children?.length - 1}
      />
    </RStack>
  );
};

export default Carousel;
