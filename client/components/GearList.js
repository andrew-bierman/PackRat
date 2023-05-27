import { theme } from "../theme";

import { Stack, Box, Text } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import { AddPack, AddPackContainer } from "./pack/AddPack";

import PackContainer from "./pack/PackContainer";
import ScoreContainer from "./ScoreContainer";

export const GearList = () => {
  return (
    <Stack
      alignSelf="center"
      w={["100%", "100%", "100%", "90%"]}
      rounded={["none", "none", "md", "lg"]}
      style={{
        flexDirection: "column",
        backgroundColor: theme.colors.card,
        gap: 15,
        marginVertical: 10,

        alignItems: "center",
      }}
    >
      <Box style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <FontAwesome5
          name="clipboard-check"
          size={20}
          color={theme.colors.cardIconColor}
        />
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.font.size,
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
