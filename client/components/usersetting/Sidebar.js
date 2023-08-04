import React from "react";
import { Box, Stack, Heading } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../../theme";
import { StyleSheet } from "react-native";
import TabField from "./Tabfield";

const SideBar = ({ activeTab, handleTabClick }) => {
  return (
    <Box
      w={["100%", "100%", "30%", "25%"]}
      display={{ base: "none", md: "flex" }}
      minH={"100%"}
      style={styles.sidebar}
    >
      <Stack space={4} flexDirection={{ base: "row", md: "column" }}>
        <Heading
          onPress={() => handleTabClick("General")}
          style={activeTab === "General" ? styles.activeTab : styles.tab}
        >
          General
        </Heading>
        <TabField title={"Change Username"} icon={"account"} />
        <TabField title={"Change Email"} icon={"email"} />
        <TabField title={"Change Password"} icon={"lock"} />

        <Heading
          onPress={() => handleTabClick("Items")}
          style={activeTab === "Items" ? styles.activeTab : styles.tab}
        >
          Items
        </Heading>
        <TabField title={"Change Units"} icon={"weight"} />
        <TabField title={"Change Weather"} icon={"weight"} />
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: theme.colors.background,
    borderBottomRightRadius: 12,
    paddingVertical: 20,
    paddingLeft: theme.padding.paddingDesktop,
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

export default SideBar;
