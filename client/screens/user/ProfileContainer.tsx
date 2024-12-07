import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Text,
  Stack,
  VStack,
  Image,
  HStack,
  Button,
} from 'native-base';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import UserDataContainer from '../../components/user/UserDataContainer';
import { useAuth } from '../../auth/provider';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import useGetPacks from "../../hooks/useGetPacks";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPacks, selectAllPacks } from '../../store/packsStore';
import {
  fetchUserFavorites,
  selectAllFavorites,
} from '../../store/favoritesStore';
import { getUser } from '../../store/userStore';
import { fetchUserTrips, selectAllTrips } from '../../store/tripsStore';
import { useMatchesCurrentUser } from '~/hooks/useMatchesCurrentUser';
import { useRouter } from 'expo-router';
import useCustomStyles from '~/hooks/useCustomStyles';
import { Skeleton } from '@packrat/ui';

const SettingsButton = () => {
  const router = useRouter();

  const onSettingsClick = () => {
    router.push('/profile/settings');
  };

  return (
    <Button
      onPress={onSettingsClick}
      variant="outline"
      mb={4}
      justifyContent={'center'}
    >
      <MaterialCommunityIcons name="cog-outline" size={24} color={'grey'} />
    </Button>
  );
};

const Header = ({
  user,
  isLoading,
  error,
  tripsCount,
  packsCount,
  favoritesCount,
  isCurrentUser,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const profileImage = user?.profileImage ?? null;
  const userRealName = user?.name ?? null;
  const userEmail = user?.email ?? null;
  const userEmailSplitFirstHalf = userEmail?.split('@')[0] ?? null;
  const username = user?.username
    ? `@${user?.username}`
    : `@${userEmailSplitFirstHalf}`;

  return (
    <Box w={['100%', '100%', '70%', '50%']} style={styles.infoSection}>
      <HStack w="100%" alignItems="center" spacing={5}>
        {isCurrentUser && !isLoading && (
          <Box alignSelf="flex-start" ml="auto">
            <SettingsButton />
          </Box>
        )}
        <VStack alignItems="center" flex={1}>
          <Box style={styles.userInfo}>
            {isLoading ? (
              <>
                <Skeleton rounded="full" size={100} />
                <Skeleton.Text
                  mt={4}
                  width={20}
                  lines={2}
                  alignItems="center"
                />
              </>
            ) : (
              <>
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
                    color="grey"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      alignSelf: 'center',
                    }}
                  />
                )}
                <Text style={styles.userName}>{userRealName}</Text>
                <Text style={styles.userEmail}>{username}</Text>
              </>
            )}
          </Box>
        </VStack>
        {isCurrentUser && !isLoading && <Box width={45} />}
        {/* This empty box is to offset the space taken by the settings button, ensuring the profile details remain centered. */}
      </HStack>
      <Stack direction="row" style={styles.card}>
        {isLoading ? (
          <>
            <Skeleton size="20" rounded="full" />
            <Skeleton size="20" rounded="full" />
            <Skeleton size="20" rounded="full" />
            <Skeleton size="20" rounded="full" />
          </>
        ) : (
          <>
            <Box style={styles.cardInfo}>
              <Text>Trips</Text>
              <Text>{tripsCount}</Text>
            </Box>
            <Box style={styles.cardInfo}>
              <Text color={currentTheme.colors.textColor}>Packs</Text>
              <Text color={currentTheme.colors.textColor}>{packsCount}</Text>
            </Box>
            <Box style={styles.cardInfo}>
              <Text color={currentTheme.colors.textColor}>Favorites</Text>
              <Text color={currentTheme.colors.textColor}>
                {favoritesCount}
              </Text>
            </Box>
            <Box style={styles.cardInfo}>
              <Text color={currentTheme.colors.textColor}>Certified</Text>
              <MaterialCommunityIcons
                name="certificate-outline"
                size={24}
                color={
                  user?.is_certified_guide
                    ? currentTheme.colors.cardIconColor
                    : currentTheme.colors.textColor
                }
              />
            </Box>
          </>
        )}
      </Stack>
      {error ? <Text>{error}</Text> : null}
    </Box>
  );
};

// Skeleton version of the UserDataCard component
const SkeletonUserDataCard = () => {
  return (
    <Box
      borderRadius={15}
      backgroundColor="gray.100"
      p={10}
      m={5}
      shadow={1}
      width="90%"
    >
      <Skeleton height={20} width="70%" mb={4} />
      <Skeleton height={20} width="50%" mb={4} />
      <Skeleton height={20} width="30%" />
    </Box>
  );
};

export default function ProfileContainer({ id = null }) {
  const dispatch = useDispatch();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const authUser = useSelector((state) => state.auth.user);
  const userStore = useSelector((state) => state.userStore);
  const authStore = useSelector((state) => state.auth);
  const allPacks = useSelector(selectAllPacks);
  const tripsData = useSelector(selectAllTrips);
  const allFavorites = useSelector(selectAllFavorites);

  id = id ?? authUser?._id;

  const differentUser = id && id !== authUser?._id;
  const isCurrentUser = useMatchesCurrentUser(id); // TODO: Implement this hook in more components

  useEffect(() => {
    if (differentUser) {
      dispatch(getUser(id));
    } else {
      dispatch(fetchUserPacks({ ownerId: authUser?._id }));
      dispatch(fetchUserFavorites(authUser?._id));
      dispatch(fetchUserTrips(authUser?._id));
    }
  }, [dispatch, id, authUser, differentUser]);

  const user = differentUser ? userStore.user : authUser;

  const isLoading = differentUser ? userStore.loading : authStore.loading;

  const error = differentUser ? userStore.error : authStore.error;

  const packsData = differentUser ? user?.packs : allPacks;
  const favoritesData = differentUser ? user?.favorites : allFavorites;

  const tripsCount = tripsData?.length ?? 0;
  const packsCount = packsData?.length ?? 0;
  const favoritesCount = favoritesData?.length ?? 0;
  const isCertified = user?.isCertified ?? false;

  // if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <VStack
        style={[
          styles.mainContainer,
          Platform.OS == 'web' ? { minHeight: '100vh' } : null,
        ]}
      >
        <Header
          user={user}
          isLoading={isLoading}
          error={error}
          tripsCount={tripsCount}
          packsCount={packsCount}
          favoritesCount={favoritesCount}
          isCurrentUser={isCurrentUser}
        />
        <Box style={styles.mainContentContainer}>
          <Box style={styles.userDataContainer}>
            {isLoading && (
              <UserDataContainer
                data={[]}
                type="packs"
                userId={user?._id}
                isLoading={isLoading}
                SkeletonComponent={SkeletonUserDataCard}
              />
            )}
          </Box>

          <Box style={styles.userDataContainer}>
            {favoritesData?.length > 0 ? (
              <UserDataContainer
                data={favoritesData}
                type="favorites"
                userId={user?._id}
                isLoading={isLoading}
              />
            ) : (
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={currentTheme.colors.textColor}
              >
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
          {Array.isArray(tripsData) && tripsData?.length > 0 && (
            <Box style={styles.userDataContainer}>
              <UserDataContainer
                data={tripsData}
                type="trips"
                userId={user?._id}
              />
            </Box>
          )}
        </Box>
      </VStack>
    </ScrollView>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    infoSection: {
      flexDirection: 'column',
      backgroundColor: currentTheme.colors.white,
      alignItems: 'center',
      borderRadius: 12,
      marginBottom: 25,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
      justifyContent: 'center',
    },
    userInfo: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    userEmail: {
      fontSize: 16,
      color: currentTheme.colors.textDarkGrey,
      textAlign: 'center',
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 15,
      borderRadius: 12,
      backgroundColor: currentTheme.colors.card,
      marginVertical: 15,
    },
    cardInfo: {
      alignItems: 'center',
    },
    mainContentContainer: {
      width: '100%',
      flex: 1,
    },
    userDataContainer: {
      marginBottom: 25,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userDataCard: {
      borderRadius: 15,
      backgroundColor: currentTheme.colors.card,
      padding: 10,
      margin: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
  };
};
