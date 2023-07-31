import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Container,
  Box,
  Text,
  Stack,
  VStack,
  Switch,
} from "native-base";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
// import UserDataContainer from "./UserDataContainer";
import { useAuth } from "../../auth/provider";

import { MaterialCommunityIcons } from "@expo/vector-icons";
// import useGetPacks from "../../hooks/useGetPacks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPacks, selectAllPacks } from "../../store/packsStore";
import { theme, darkTheme } from "../../theme";
import UseTheme from "../../hooks/useTheme";
export default function AppearanceContainer() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  // console.log("currentTheme", currentTheme);
  const [mode, setMode] = useState(theme);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  // console.log({ isDark, isLight });

  // const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPacks(user?._id));
  }, [dispatch, user?._id]);
  useEffect(() => {
    console.log("isEnabled", isEnabled);
    if (isEnabled) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }, [isEnabled]);

  const user = useSelector((state) => state.auth.user);
  const packsData = useSelector(selectAllPacks);
  const tripsData = useSelector((state) => state.trips);

  // const { data } = useGetPacks(user?._id);
  // console.log(user);

  const isLoading = useSelector((state) => state?.auth?.loading);
  const error = useSelector((state) => state?.auth?.error);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const handleChangeDark = () => {
    console.log("first");
    enableDarkMode();
    console.log("2nd");
  };
  const handleChangeLight = () => {
    console.log("first");
    enableLightMode();
    console.log("2nd");
  };
  return (
    <VStack
      style={[
        styles.mainContainer,
        Platform.OS == "web" ? { minHeight: "100vh" } : null,
      ]}
    >
      <Box w={["100%", "100%", "70%", "50%"]} style={styles.infoSection}>
        <Box style={styles.cardInfo}>
          <Text style={{ color: currentTheme.colors.drawerIconColor }}>
            Theme Changer
          </Text>
        </Box>
        <Stack direction={["column", "row", "row", "row"]} style={styles.card}>
          <Box style={styles.cardInfo}>
            {/* <TouchableOpacity onPress={handleChangeLight}>
              <Text>Light Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "black" }}
              onPress={handleChangeDark}
            >
              <Text style={{ color: "white" }}>Dark Mode</Text>
            </TouchableOpacity> */}
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </Box>
          <Box style={styles.cardInfo}>
            <Text>Packs</Text>
            {/* <Text>{packsData?.length}</Text> */}
          </Box>
          <Box style={styles.cardInfo}>
            {/* <Text>Certified</Text> */}
            <MaterialCommunityIcons
              name="certificate-outline"
              size={24}
              color={user?.is_certified_guide ? "green" : "grey"}
            />
          </Box>
        </Stack>
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    gap: 35,
    width: "100%",
    alignItems: "center",
    padding: 25,
    fontSize: 26,
  },
  infoSection: {
    flexDirection: "column",
    gap: 25,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 25,
    position: "relative",
  },
  card: {
    gap: 25,
    backgroundColor: "white",
    alignItems: "center",
  },

  cardInfo: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: 12,
  },
});
