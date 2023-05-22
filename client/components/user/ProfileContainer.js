import React, { useEffect } from "react";
import { NativeBaseProvider, Container, Box, Text, Stack } from "native-base";
import { StyleSheet } from "react-native";
import PacksContainer from "./PacksContainer";
import { useAuth } from "../../auth/provider";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import useGetPacks from "../../hooks/useGetPacks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPacks } from "../../store/packsStore";

export default function ProfileContainer() {
  // const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPacks(user?._id));
  }, [dispatch, user?._id]);

  const user = useSelector((state) => state.auth.user);
  const PacksData = useSelector((state) => state?.packs);

  // const { data } = useGetPacks(user?._id);
  console.log(user);

  const isLoading = useSelector((state) => state?.auth?.loading);
  const error = useSelector((state) => state?.auth?.error);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box style={styles.mainContainer}>
      <Box w={["100%", "100%", "70%", "50%"]} style={styles.infoSection}>
        <Box style={styles.cardInfo}>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
        </Box>
        <Stack direction={["column", "row", "row", "row"]} style={styles.card}>
          <Box style={styles.cardInfo}>
            <Text>Trips</Text>
            <Text>0</Text>
          </Box>
          <Box style={styles.cardInfo}>
            <Text>Packs</Text>
            <Text>{PacksData?.packs?.length}</Text>
          </Box>
          <Box style={styles.cardInfo}>
            <Text>Certified</Text>
            <MaterialCommunityIcons
              name="certificate-outline"
              size={24}
              color={user?.is_certified_guide ? "green" : "grey"}
            />
          </Box>
        </Stack>
        <Box
          style={{
            width: "100%",
            alignItems: "center",
            padding: 8,
            backgroundColor: "#dbeafe",
            borderBottomEndRadius: 12,
            borderBottomStartRadius: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Packs</Text>
        </Box>
        {error ? <Text>{error}</Text> : null}
      </Box>
      {isLoading ? (
        <Text>Loading....</Text>
      ) : (
        <PacksContainer data={PacksData?.packs} />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    gap: 35,
    minHeight: "100vh",
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
