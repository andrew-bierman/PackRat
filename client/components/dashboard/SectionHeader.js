// SectionHeader.js
import React from "react";
import { Text, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

const SectionHeader = ({ iconName, text }) => {
  return (
    <HStack style={styles.hStack}>
      <Ionicons name={iconName} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </HStack>
  );
};

const styles = StyleSheet.create({
  hStack: {
    marginBottom: 10,
    justifyContent: "space-around", // Updated from "space-between"
    alignItems: "center",
  },
  text: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "bold",

  },
  icon: {
    fontSize: 40,
    margin: 10,
    color: "white",
  },
});

export default SectionHeader;
