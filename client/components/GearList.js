import { theme } from "../theme";

import { Stack, Box, Text } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import { AddPack, AddPackContainer } from "./pack/AddPack";
import UseTheme from "../hooks/useTheme";
import PackContainer from "./pack/PackContainer";
import ScoreContainer from "./ScoreContainer";

export const GearList = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  return (
    <Stack
      alignSelf="center"
      w={["100%", "100%", "100%", "90%"]}
      rounded={["none", "none", "md", "lg"]}
      style={{
        flexDirection: "column",
        backgroundColor: currentTheme.colors.card,
        gap: 15,
        marginVertical: 10,

        alignItems: "center",
      }}
    >
      <Box style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <FontAwesome5
          name="clipboard-check"
          size={20}
          color={currentTheme.colors.cardIconColor}
        />
        <Text
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            paddingVertical: 12,
            fontWeight: 600,
          }}
        >
          Gear List
        </Text>
      </Box>
      {/* <AddPack/> */}
      <AddPackContainer />
      <PackContainer isCreatingTrip={true} />
      {/* <ScoreContainer /> */}
    </Stack>
  );
};
