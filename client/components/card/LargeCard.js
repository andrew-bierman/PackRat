import React from "react";
import { Box, Text, Stack } from "native-base";
import { StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";
import UseTheme from '../../hooks/useTheme';

import { theme } from "../../theme";

const getContainerStyle = (type) => {
  switch (type) {
    case "search":
      return styles().searchContainer;
    case "map":
      return styles().mapCard;
    case "mobile":
      return styles().containerMobile;
    default:
      return styles().mutualStyles;
  }
};

export default function LargeCard({
  title,
  Icon,
  ContentComponent,
  contentProps,
  type,
  customStyle,
  children,
}) {
  const currentShape = useSelector(
    (state) => state.search.selectedSearchResult
  );

  console.log("currentShape", currentShape);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
  const containerStyle = customStyle || getContainerStyle(type);

  return (
    <Stack
      alignSelf="center"
      w={["100%", "100%", "100%", "90%"]}
      direction={["column", "column", "row", "row"]}
      rounded={["none", "none", "md", "lg"]}
      style={containerStyle}
    >
      <Box
        style={{
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        {Icon ? <Icon /> : null}
        <Text
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            fontWeight: 600,
          }}
        >
          {title && <Text>{title}</Text>}
        </Text>
      </Box>
      {ContentComponent ? <ContentComponent {...contentProps} /> : null}
      {children}
    </Stack>
  );
}

const styles = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();

  return StyleSheet.create({
    mutualStyles: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      padding: currentTheme.size.cardPadding,
    },
    containerMobile: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: "space-between",
      alignItems: "center",
      gap: 25,
      flex: 1,
      paddingHorizontal: 100,
    },
    searchContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flex: 1,
      paddingHorizontal: 60,
      paddingVertical: 70,
      height: Platform.OS === "web" ? "450px" : "100%",
    },
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: currentTheme.size.cardPadding,
      paddingHorizontal: currentTheme.padding.paddingInside,
      marginBottom: 20,
      height: Platform.OS === "web" ? "650px" : "100%",
      overflow: "hidden",
    },
  });
} 
