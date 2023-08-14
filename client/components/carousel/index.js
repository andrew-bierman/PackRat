// import React, { useRef, useState } from "react";
// import { ScrollView, StyleSheet } from "react-native";
// import { VStack } from "native-base";
// import ScrollButton from "./ScrollButton";

// const Carousel = ({ children, itemWidth }) => {
//   const scrollViewRef = useRef();
//   const [scrollX, setScrollX] = useState(0);

//   const scroll = (direction) => {
//     const delta = direction === "left" ? -itemWidth : itemWidth;
//     const x = scrollX + delta;
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         x,
//         y: 0,
//         animated: true,
//       });
//       setScrollX(x); // update scrollX here
//     }
//   };

//   return (
//     <VStack
//       style={{
//         width: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "row",
//         backgroundColor: 'red'
//       }}
//     >
//       <ScrollButton
//         direction="left"
//         scrollViewRef={scrollViewRef}
//         onPress={() => scroll("left")}
//       />
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal={true}
//         scrollEnabled={false}
//         onScroll={(event) => setScrollX(event.nativeEvent.contentOffset.x)}
//         scrollEventThrottle={16}
//         style={styles.carousel}
//         showsHorizontalScrollIndicator={false}
//       >
//         {children}
//       </ScrollView>
//       <ScrollButton
//         direction="right"
//         scrollViewRef={scrollViewRef}
//         onPress={() => scroll("right")}
//       />
//     </VStack>
//   );
// };

// const styles = StyleSheet.create({
//   carousel: {
//     flexDirection: "row",
//     width: "100%",
//   },
// });

// export default Carousel;





import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Platform, View, Dimensions } from "react-native";
import { VStack } from "native-base";
import ScrollButton from "./ScrollButton";

const { height, width } = Dimensions.get('window')

const Carousel = ({ children, itemWidth }) => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const newIndex = Math.round(contentOffset.x / itemWidth);
    setCurrentIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (index >= 0 && index < children.length && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (index * (itemWidth + 20)),
        y: 0,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  return (
    <VStack
      style={{
        width: Platform.OS === "web" ? '100%' : width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <ScrollButton
        direction="left"
        onPress={() => scrollToIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
      />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={Platform.OS === "web" ? true : false}
        gestureEnabled={false} // Add this prop
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
      >
        {children.map((child, index) => (
          <VStack style={{ width: itemWidth + 10, marginRight: 10, marginTop: 10, flexDirection: 'row' }}>
            {child}
          </VStack>
        ))}
      </ScrollView>
      <ScrollButton
        direction="right"
        onPress={() => scrollToIndex(currentIndex + 1)}
        disabled={currentIndex === children.length - 1}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flexDirection: "row",
    width: Platform.OS === 'web' ? "100%" : width * 0.8,
  },
});

export default Carousel;