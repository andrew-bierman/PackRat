import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ScrollButton = ({ direction, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.scrollButton}
    >
      {direction === "left" && <Text style={styles.iconStyles}>&lang;</Text>}
      {direction != "left" && <Text style={styles.iconStyles}>&rang;</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyles: {
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20
  },
});

export default ScrollButton;
