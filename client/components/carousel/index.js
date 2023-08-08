import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { VStack } from "native-base";
import ScrollButton from "./ScrollButton";

const Carousel = ({ children, itemWidth }) => {
  const scrollViewRef = useRef();
  const [scrollX, setScrollX] = useState(0);

  const scroll = (direction) => {
    const delta = direction === "left" ? -itemWidth : itemWidth;
    const x = scrollX + delta;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x,
        y: 0,
        animated: true,
      });
      setScrollX(x); // update scrollX here
    }
  };

  return (
    <VStack
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <ScrollButton
        direction="left"
        scrollViewRef={scrollViewRef}
        onPress={() => scroll("left")}
      />
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
       pagingEnabled={true}
        
        onScroll={(event) => setScrollX(event.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <ScrollButton
        direction="right"
        scrollViewRef={scrollViewRef}
        onPress={() => scroll("right")}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flexDirection: "row",
    width: "100%",
  },
});

export default Carousel;
