import React, { useCallback, useRef, useState } from 'react';

const useCarousel = ({ children = [], itemWidth }) => {
  const scrollViewRef = useRef<{scrollTo: any}>();
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Handles the scroll event.
   *
   * @param {object} event - The scroll event object.
   */
  const handleScroll = useCallback((event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const newIndex = Math.round(contentOffset.x / itemWidth);
    setCurrentIndex(newIndex);
  }, [])

  /**
   * Scrolls to the specified index.
   *
   * @param {number} index - The index to scroll to.
   */
  const scrollToIndex = useCallback( (index: number) => {
    if (index >= 0 && index < children.length && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (itemWidth + 20),
        y: 0,
        animated: true,
      });
      setCurrentIndex(index);
    }
  }, [scrollViewRef, setCurrentIndex, children]);

  return {
    scrollViewRef,
    currentIndex,
    handleScroll,
    scrollToIndex
  }
}

export default useCarousel