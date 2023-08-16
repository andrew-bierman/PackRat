import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon, Button } from "native-base";
import { StyleSheet, View } from "react-native";

const ScrollButton = ({ direction, onPress }) => {
  return (
    <View style={styles.container}>
      <Button onPress={onPress} style={styles.scrollButton}>
        <Icon
          as={Ionicons}
          name={direction === "left" ? "chevron-back" : "chevron-forward"}
          size="md"
          color="white"
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  scrollButton: {
    backgroundColor: "transparent",
    zIndex: 1,
    // height: "100%",
    // width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScrollButton;
