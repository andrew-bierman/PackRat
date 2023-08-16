import React from "react";
import { Box, Text, Stack } from "native-base";
import { StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";

import { theme } from "../../theme";

const getContainerStyle = (type) => {
  switch (type) {
    case "search":
      return styles.searchContainer;
    case "map":
      return styles.mapCard;
    case "mobile":
      return styles.containerMobile;
    default:
      return styles.mutualStyles;
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
            color: theme.colors.textPrimary,
            fontSize: theme.font.size,
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

const styles = StyleSheet.create({
  mutualStyles: {
    backgroundColor: theme.colors.card,
    flex: 1,
    gap: 45,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: theme.size.cardPadding,
  },
  containerMobile: {
    backgroundColor: theme.colors.card,
    padding: theme.size.mobilePadding,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 25,
    flex: 1,
    paddingHorizontal: 100,
  },
  searchContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.size.mobilePadding,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingHorizontal: 60,
    paddingVertical: 70,
    height: Platform.OS === "web" ? "450px" : "100%",
  },
  mapCard: {
    backgroundColor: theme.colors.card,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.size.cardPadding,
    paddingHorizontal: theme.padding.paddingInside,
    marginBottom: 20,
    height: Platform.OS === "web" ? "650px" : "100%",
    overflow: "hidden",
  },
});
