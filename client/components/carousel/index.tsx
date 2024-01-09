import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, Platform, Dimensions } from 'react-native';
import { RStack } from '@packrat/ui';
import ScrollButton from './ScrollButton';
import useCustomStyles from '~/hooks/useCustomStyles';
import useCarousel from '~/hooks/carousel';

const { height, width } = Dimensions.get('window');

const Carousel = ({ children = [], itemWidth }) => {

  const styles = useCustomStyles(loadStyles);
  const {
    scrollViewRef,
    currentIndex,
    handleScroll,
    scrollToIndex
  } = useCarousel({ children, itemWidth })

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
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
      >
        {children &&
          children.map((child, index) => (
            <RStack
              key={index}
              style={{
                width: itemWidth + 10,
                marginRight: 10,
                marginTop: 10,
                flexDirection: 'row',
              }}
            >
              {child}
            </RStack>
          ))}
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

const loadStyles = () => ({
  carousel: {
    flexDirection: 'row',
    width: Platform.OS === 'web' ? '100%' : width * 0.8,
  },
});

export default Carousel;
