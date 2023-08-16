import React, { useEffect, useState } from "react";
import { VStack, Box, Text, Switch } from "native-base";
import { StyleSheet } from "react-native";
import UseTheme from "../../hooks/useTheme";

export default function AppearanceContainer() {
  const { enableDarkMode, enableLightMode, currentTheme, isDark } = UseTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((prevIsEnabled) => {
      const newState = !prevIsEnabled;
      newState ? enableDarkMode() : enableLightMode();
      return newState;
    });
  };
  

  useEffect(() => {
    setIsEnabled(isDark); // synchronize isEnabled with isDark whenever isDark changes
  }, [isDark]);
  
  return (
    <VStack style={styles.mainContainer}>
      <Box style={styles.infoSection}>
        <Text style={{ color: currentTheme.colors.drawerIconColor }}>
          Theme Changer
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ color: currentTheme.colors.drawerIconColor }}>
          {isEnabled ? "Dark Mode" : "Light Mode"}
        </Text>
        <Text>{JSON.stringify(currentTheme)}</Text>
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  infoSection: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 12,
    padding: 20,
  },
});
