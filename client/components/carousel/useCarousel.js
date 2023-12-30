import { useRef, useState } from 'react';

export default useCarousel = () => {
  const scrollViewRef = useRef();
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
  return {
    scrollViewRef,
    currentIndex,
    handleScroll,
    scrollToIndex,
  };
};
