import React from "react";
import { Box, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../../theme";

const TabField = ({ title, icon }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      color={theme.colors.text}
      p={2}
      style={{ gap: 5 }}
      alignItems={"center"}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={theme.colors.iconColor}
      />
      <Text color={theme.colors.text}>{title}</Text>
    </Box>
  );
};

export default TabField;
