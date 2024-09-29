import React, { useRef, useState, ReactNode } from 'react';
import {
  ScrollView,
  Platform,
  Dimensions,
  NativeScrollEvent,
  RefreshControl,
  FlatList,
} from 'react-native';
import { RStack, RText } from '@packrat/ui';
import ScrollButton from './ScrollButton';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface CarouselProps {
  children?: ReactNode[];
  itemWidth?: number;
  iconColor?: string;
  refreshing?: boolean;
  onEndReached: () => void;
  onRefresh?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

const Carousel: React.FC<CarouselProps> = ({
  children = [],
  itemWidth,
  refreshing,
  onRefresh,
  onEndReached,
  iconColor,
}) => {
  const scrollViewRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const styles = useCustomStyles(loadStyles);

  const handleScroll = (event: { nativeEvent: NativeScrollEvent }) => {
    const contentOffset = event.nativeEvent.contentOffset;
    if (itemWidth) {
      const newIndex = Math.round(contentOffset.x / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < children.length && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (itemWidth || 220), // Use itemWidth if passed
        y: 0,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  return (
    <RStack
      style={{
        alignSelf: 'center',
        width: Platform.OS === 'web' ? '90%' : screenWidth, // Full width on native
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
      }}
    >
      {/* Show buttons only on web */}
      {Platform.OS === 'web' && (
        <ScrollButton
          direction="left"
          onPress={() => {
            scrollToIndex(currentIndex - 1);
          }}
          disabled={currentIndex === 0}
        />
      )}

      <FlatList
        ref={scrollViewRef}
        horizontal
        scrollEnabled
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
        // pagingEnabled
        onMomentumScrollEnd={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        // keyExtractor={keyExtractor}
        data={children} // Pass the children as data to FlatList
        renderItem={({ item, index }) => (
          <RStack
            key={index}
            style={{
              ...(index === 0 ? { marginLeft: 10 } : { marginLeft: 0 }),
              marginRight: 10,
              marginTop: 10,    
              flexDirection: 'row',
            }}
          >
            {item}
          </RStack>
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
      />

      {/* Show buttons only on web */}
      {Platform.OS === 'web' && (
        <ScrollButton
          direction="right"
          onPress={() => {
            scrollToIndex(currentIndex + 1);
          }}
          disabled={currentIndex === children?.length - 1}
        />
      )}
    </RStack>
  );
};

const loadStyles = () => {
  return {
    carousel: {
      flexDirection: 'row',
      width: '100%',
    },
  };
};

export default Carousel;
