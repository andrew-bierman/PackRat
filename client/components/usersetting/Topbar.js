import React from "react";
import { Box, Heading, Stack } from "native-base";
import { theme } from "../../../theme";
import { StyleSheet } from "react-native";

const TopBar = ({ activeTab, handleTabClick }) => {
  return (
    <Box
      w={"100%"}
      display={{ base: "flex", md: "none" }}
      style={styles.topbar}
    >
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Heading
          onPress={() => handleTabClick("General")}
          style={activeTab === "General" ? styles.activeTab : styles.tab}
        >
          General
        </Heading>

        <Heading
          onPress={() => handleTabClick("Items")}
          style={activeTab === "Items" ? styles.activeTab : styles.tab}
        >
          Items
        </Heading>
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: theme.colors.background,
    paddingVertical: 20,
    paddingHorizontal: theme.padding.paddingDesktop,
    marginBottom: 20, // Add some margin at the bottom for better separation
  },
  activeTab: {
    fontWeight: "bold",
    color: theme.colors.text, // Use primary color from theme
  },
  tab: {
    color: theme.colors.textSecondary, // Use secondary text color from theme
  },
});

export default TopBar;
