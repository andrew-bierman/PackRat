import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { RIconButton, RStack, RText, RSkeleton } from '@packrat/ui';
import { ScrollView } from 'react-native-gesture-handler';
import UserDataContainer from '../../components/user/UserDataContainer';
import useTheme from '../../hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import useGetPacks from "../../hooks/useGetPacks";
import { useRouter } from 'app/hooks/router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import Avatar from '../../components/Avatar/Avatar';
import { useProfile } from 'app/hooks/user';
import Layout from 'app/components/layout/Layout';

const SettingsButton = () => {
  const router = useRouter();

  const onSettingsClick = () => {
    router.push('/profile/settings');
  };

  return (
    <RIconButton
      onPress={onSettingsClick}
      style={{
        backgroundColor: 'transparent',
        marginBottom: 16,
        justifyContent: 'center',
        border: '1px solid lightgray',
        borderRadius: 8,
      }}
      icon={
        <MaterialCommunityIcons name="cog-outline" size={24} color={'grey'} />
      }
    />
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
    <Layout>
      <View style={{ width: '90%', ...styles.infoSection }}>
      <RStack
        style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}
      >
        {isCurrentUser && !isLoading && (
          <View style={{ alignSelf: 'flex-start', marginLeft: 'auto' }}>
            <SettingsButton />
          </View>
        )}
        <RStack style={{ alignItems: 'center', flex: 1 }}>
          <View style={styles.userInfo}>
            {isLoading ? (
              <>
                <RSkeleton
                  style={{
                    borderRadius: 100,
                    height: 100,
                    width: 100,
                  }}
                />
                <RSkeleton
                  style={{
                    height: 100,
                    width: '100%',
                    marginTop: 8,
                    alignItems: 'center',
                  }}
                />
              </>
            ) : (
              <>
                <Avatar src={user?.profileImage} />
                <RText style={{ marginTop: 16, ...styles.userName }}>
                  {userRealName}
                </RText>
                <RText style={styles.userEmail}>{username}</RText>
              </>
            )}
          </View>
        </RStack>
        {isCurrentUser && !isLoading && <View style={{ width: 45 }} />}
      </RStack>
      <RStack style={{ flexDirection: 'row', ...styles.card }}>
        {isLoading ? (
          <>
            <RSkeleton style={{ borderRadius: 100, width: 50, height: 50 }} />
            <RSkeleton style={{ borderRadius: 100, width: 50, height: 50 }} />
            <RSkeleton style={{ borderRadius: 100, width: 50, height: 50 }} />
            <RSkeleton style={{ borderRadius: 100, width: 50, height: 50 }} />
          </>
        ) : (
          <>
            <View style={styles.cardInfo}>
              <RText>Trips</RText>
              <RText>{tripsCount}</RText>
            </View>
            <View style={styles.cardInfo}>
              <RText color={currentTheme.colors.textColor}>Packs</RText>
              <RText color={currentTheme.colors.textColor}>{packsCount}</RText>
            </View>
            <View style={styles.cardInfo}>
              <RText color={currentTheme.colors.textColor}>Favorites</RText>
              <RText color={currentTheme.colors.textColor}>
                {favoritesCount}
              </RText>
            </View>
            <View style={styles.cardInfo}>
              <RText color={currentTheme.colors.textColor}>Certified</RText>
              <MaterialCommunityIcons
                name="certificate-outline"
                size={24}
                color={
                  user?.is_certified_guide
                    ? currentTheme.colors.cardIconColor
                    : currentTheme.colors.textColor
                }
              />
            </View>
          </>
        )}
      </RStack>
      {error ? <RText>{error}</RText> : null}
    </View>
    </Layout>
  );
};

// Skeleton version of the UserDataCard component
const SkeletonUserDataCard = () => {
  return (
    <View
      style={{
        borderRadius: 15,
        backgroundColor: 'lightgray',
        padding: 10,
        margin: 5,
        width: '90%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <RSkeleton style={{ marginBottom: 8, height: 50, width: '70%' }} />
      <RSkeleton style={{ marginBottom: 8, height: 50, width: '50%' }} />
      <RSkeleton style={{ height: 50, width: '30%' }} />
    </View>
  );
};

export default function ProfileContainer({ id = null }) {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const {
    user,
    favoritesList,
    packsList,
    tripsList,
    tripsCount,
    packsCount,
    favoritesCount,
    isLoading,
    isCurrentUser,
    error,
  } = useProfile(id);

  return (
    <View>
      <ScrollView>
        <RStack
          style={[
            styles.mainContainer,
            Platform.OS == 'web'
              ? { minHeight: '100vh' }
              : { minHeight: '100%', paddingBottom: 40 },
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
          <View style={styles.mainContentContainer}>
            <View style={styles.userDataContainer}>
              {isLoading && (
                <UserDataContainer
                  data={[]}
                  type="packs"
                  userId={user?.id}
                  isLoading={isLoading}
                  SkeletonComponent={SkeletonUserDataCard}
                />
              )}
            </View>

            <View style={styles.userDataContainer}>
              {favoritesList.length > 0 ? (
                <UserDataContainer
                  data={favoritesList}
                  type="favorites"
                  userId={user?.id}
                  isLoading={isLoading}
                />
              ) : (
                <RText
                  fontSize={20}
                  fontWeight="bold"
                  color={currentTheme.colors.textColor}
                >
                  No favorites yet
                </RText>
              )}
            </View>
            {packsList.length > 0 && (
              <View style={styles.userDataContainer}>
                <UserDataContainer
                  data={packsList}
                  type="packs"
                  userId={user?.id}
                />
              </View>
            )}
            {tripsList.length > 0 && (
              <View style={styles.userDataContainer}>
                <UserDataContainer
                  data={tripsList}
                  type="trips"
                  userId={user?.id}
                />
              </View>
            )}
          </View>
        </RStack>
      </ScrollView>
    </View>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      // flex: 1,
      alignItems: 'center',
      justifyItems: 'center',
      padding: 20,
    },
    infoSection: {
      flexDirection: 'column',
      alignSelf:'center',
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
