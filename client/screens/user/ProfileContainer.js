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
import UserDataContainer from "../../components/user/UserDataContainer";
import { useAuth } from "../../auth/provider";
import { theme } from "../../theme";
import UseTheme from '../../hooks/useTheme';
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

const Header = ({
  user,
  isLoading,
  error,
  tripsCount,
  packsCount,
  favoritesCount,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
  const profileImage = user?.profileImage ?? null;
  const userRealName = user?.name ?? null;
  const userEmail = user?.email ?? null;
  const userEmailSplitFirstHalf = userEmail?.split("@")[0] ?? null;
  const username = user?.username
    ? `@${user?.username}`
    : `@${userEmailSplitFirstHalf}`;

  return (
    <Box w={["100%", "100%", "70%", "50%"]} style={styles().infoSection}>
      <Box style={styles().userInfo}>
        {profileImage ? (
          <Image
            source={{ uri: user?.profileImage }}
            alt="Profile Image"
            borderRadius={50}
            size={100}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <MaterialCommunityIcons
            name="account-circle"
            size={100}
            color={currentTheme.colors.cardIconColor}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
            }}
          />
        )}
        <Text style={styles().userName} color={currentTheme.colors.textColor}>{userRealName}</Text>
        <Text style={styles().userEmail} color={currentTheme.colors.textColor}>{username}</Text>
      </Box>
      <Stack direction="row" style={styles().card}>
        <Box style={styles().cardInfo}>
          <Text color={currentTheme.colors.textColor}>Trips</Text>
          <Text color={currentTheme.colors.textColor}>{tripsCount}</Text>
        </Box>
        <Box style={styles().cardInfo}>
          <Text color={currentTheme.colors.textColor}>Packs</Text>
          <Text color={currentTheme.colors.textColor}>{packsCount}</Text>
        </Box>
        <Box style={styles().cardInfo}>
          <Text color={currentTheme.colors.textColor}>Favorites</Text>
          <Text color={currentTheme.colors.textColor}>{favoritesCount}</Text>
        </Box>
        <Box style={styles().cardInfo}>
          <Text color={currentTheme.colors.textColor}>Certified</Text>
          <MaterialCommunityIcons
            name="certificate-outline"
            size={24}
            color={user?.is_certified_guide ? currentTheme.colors.cardIconColor : currentTheme.colors.textColor}
          />
        </Box>
      </Stack>
      {error ? <Text>{error}</Text> : null}
    </Box>
  );
};

export default function ProfileContainer({ id = null }) {
  const dispatch = useDispatch();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
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

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack
      style={[
        styles().mainContainer,
        Platform.OS == "web" ? { minHeight: "100vh" } : null,
      ]}
    >
      <Header
        user={user}
        isLoading={isLoading}
        error={error}
        tripsCount={tripsCount}
        packsCount={packsCount}
        favoritesCount={favoritesCount}
      />
      {isLoading ? (
        <Text>Loading....</Text>
      ) : (
        <Box style={styles().mainContentContainer}>
          <Box style={styles().userDataContainer}>
            {favoritesData?.length > 0 ? (
              <UserDataContainer
                data={favoritesData}
                type="favorites"
                userId={user?._id}
              />
            ) : (
              <Text fontSize="2xl" fontWeight="bold" color={currentTheme.colors.textColor}>
                No favorites yet
              </Text>
            )}
          </Box>
          {Array.isArray(packsData) && packsData.length > 0 && (
            <Box style={styles().userDataContainer}>
              <UserDataContainer
                data={packsData}
                type="packs"
                userId={user?._id}
              />
            </Box>
          )}
          {Array.isArray(tripsData?.trips) && tripsData?.trips.length > 0 && (
            <Box style={styles().userDataContainer}>
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

const styles = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
    infoSection: {
      flexDirection: "column",
      backgroundColor: currentTheme.colors.white,
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
      justifyContent: "center",
    },
    userInfo: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },
    userName: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    userEmail: {
      fontSize: 16,
      color: currentTheme.colors.textDarkGrey,
      textAlign: "center",
    },
    card: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      padding: 15,
      borderRadius: 12,
      backgroundColor: currentTheme.colors.card,
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
      backgroundColor: currentTheme.colors.card,
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
}
