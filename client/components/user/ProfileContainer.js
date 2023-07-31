import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Container,
  Box,
  Text,
  Stack,
  VStack,
  Image,
  HStack,
} from "native-base";
import { Platform, StyleSheet } from "react-native";
import UserDataContainer from "./UserDataContainer";
import { useAuth } from "../../auth/provider";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import useGetPacks from "../../hooks/useGetPacks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPacks, selectAllPacks } from "../../store/packsStore";
import {
  fetchUserFavorites,
  selectAllFavorites,
} from "../../store/favoritesStore";
import { getUser } from "../../store/userStore";
import { fetchUserTrips } from "../../store/tripsStore";

export default function ProfileContainer({ id = null }) {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const userStore = useSelector((state) => state.userStore);
  const authStore = useSelector((state) => state.auth);
  const allPacks = useSelector(selectAllPacks);
  const tripsData = useSelector((state) => state.trips);
  const allFavorites = useSelector(selectAllFavorites);

  const differentUser = id && id !== authUser._id;

  useEffect(() => {
    if (differentUser) {
      dispatch(getUser(id));
    } else {
      dispatch(fetchUserPacks(authUser?._id));
      dispatch(fetchUserFavorites(authUser?._id));
      dispatch(fetchUserTrips(authUser?._id));
    }
  }, [dispatch, id, authUser, differentUser]);

  const user = differentUser ? userStore.user : authUser;

  const isLoading = differentUser ? userStore.loading : authStore.loading;

  const error = differentUser ? userStore.error : authStore.error;

  const packsData = differentUser ? user?.packs : allPacks;
  const favoritesData = differentUser ? user?.favorites : allFavorites;

  const tripsCount = tripsData?.trips?.length ?? 0;
  const packsCount = packsData?.length ?? 0;
  const favoritesCount = favoritesData?.length ?? 0;
  const isCertified = user?.isCertified ?? false;

  const profileImage = user?.profileImage ?? null;
  const userRealName = user?.name ?? null;
  const userEmail = user?.email ?? null;
  const userEmailSplitFirstHalf = userEmail?.split("@")[0] ?? null;
  const username = user?.username ? `@${user?.username}` : `@${userEmailSplitFirstHalf}`;

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack
      style={[
        styles.mainContainer,
        Platform.OS == "web" ? { minHeight: "100vh" } : null,
      ]}
    >
      <Box w={["100%", "100%", "70%", "50%"]} style={styles.infoSection}>
        <Box style={styles.cardInfo}>
          {profileImage ? (
            <Image
              source={{ uri: user?.profileImage }}
              alt="Profile Image"
              borderRadius={50}
              size={100}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={100}
              color="grey"
            />
          )}
        <Text style={styles.userName}>{userRealName}</Text>
        <Text style={styles.userEmail}>{username}</Text>
        </Box>
        <Stack direction="row" style={styles.card}>
          <Box style={styles.cardInfo}>
            <Text>Trips</Text>
            <Text>{tripsCount}</Text>
          </Box>
          <Box style={styles.cardInfo}>
            <Text>Packs</Text>
            <Text>{packsCount}</Text>
          </Box>
          <Box style={styles.cardInfo}>
            <Text>Favorites</Text>
            <Text>{favoritesCount}</Text>
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
        <Box style={styles.mainContentContainer}>
          <Box style={styles.userDataContainer}>
            {favoritesData?.length > 0 ? (
              <UserDataContainer
                data={favoritesData}
                type="favorites"
                userId={user?._id}
              />
            ) : (
              <Text fontSize="2xl" fontWeight="bold" color="white">
                No favorites yet
              </Text>
            )}
          </Box>
          {Array.isArray(packsData) && packsData.length > 0 && (
            <Box style={styles.userDataContainer}>
              <UserDataContainer
                data={packsData}
                type="packs"
                userId={user?._id}
              />
            </Box>
          )}
          {Array.isArray(tripsData?.trips) && tripsData?.trips.length > 0 && (
            <Box style={styles.userDataContainer}>
              <UserDataContainer
                data={tripsData?.trips}
                type="trips"
                userId={user?._id}
              />
            </Box>
          )}
        </Box>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  infoSection: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  userEmail: {
    fontSize: 16,
    color: "grey",
    marginLeft: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#f2f3f7",
    marginVertical: 15,
  },
  cardInfo: {
    alignItems: "center",
  },
  mainContentContainer: {
    width: "100%",
    flex: 1,
  },
  userDataContainer: {
    marginBottom: 25,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userDataCard: {
    borderRadius: 15,
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
