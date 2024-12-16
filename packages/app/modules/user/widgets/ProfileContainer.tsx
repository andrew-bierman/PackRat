import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import {
  RIconButton,
  RStack,
  RText as OriginalRText,
  RSkeleton,
  XStack,
} from '@packrat/ui';
import { ScrollView } from 'react-native-gesture-handler';
import { UserDataContainer } from './UserDataContainer';
import useTheme from '../../../hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import useGetPacks from "../../hooks/useGetPacks";
import { useRouter } from 'app/hooks/router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import Avatar from '../../../components/Avatar/Avatar';
import { useProfile } from '../hooks';
import Layout from 'app/components/layout/Layout';
import { AsyncView } from 'app/components/AsyncView';
import { LayoutCard } from 'app/components/LayoutCard';

const RText: any = OriginalRText;

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
  const userRealName = user?.name ?? null;
  const userEmail = user?.email ?? null;
  const userEmailSplitFirstHalf = userEmail?.split('@')[0] ?? null;
  const username = user?.username
    ? `@${user?.username}`
    : `@${userEmailSplitFirstHalf}`;

  return (
    <View>
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
      <AsyncView
        isLoading={isLoading}
        isError={!!error}
        errorComponent={<RText>{error}</RText>}
      >
        <LayoutCard style={{ width: '100%' }}>
          <XStack style={{ justifyContent: 'space-around' }}>
            <View style={styles.cardInfo}>
              <RText style={{ fontSize: 16, lineHeight: 20 }}>Trips</RText>
              <RText style={{ fontSize: 24, fontWeight: 500, lineHeight: 32 }}>
                {tripsCount}
              </RText>
            </View>
            <View style={styles.cardInfo}>
              <RText style={{ fontSize: 16, lineHeight: 20 }}>Packs</RText>
              <RText style={{ fontSize: 24, fontWeight: 500, lineHeight: 32 }}>
                {packsCount}
              </RText>
            </View>
            <View style={styles.cardInfo}>
              <RText style={{ fontSize: 16, lineHeight: 20 }}>Favorites</RText>
              <RText style={{ fontSize: 24, fontWeight: 500, lineHeight: 32 }}>
                {favoritesCount}
              </RText>
            </View>
            {/* TODO add guide users */}
            {/* <View style={styles.cardInfo}>
              <RText>Certified</RText>
              <MaterialCommunityIcons
                name="certificate-outline"
                size={24}
                color={
                  user?.is_certified_guide
                    ? currentTheme.colors.cardIconColor
                    : currentTheme.colors.tertiaryBlue
                }
              />
            </View> */}
          </XStack>
        </LayoutCard>
      </AsyncView>
    </View>
  );
};

export function ProfileContainer({ id = null }) {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const {
    user,
    favoritesQuery,
    userPacksQuery,
    userTripsQuery,
    searchTerms,
    onSearchChange,
    tripsCount,
    packsCount,
    favoritesCount,
    isLoading,
    isCurrentUser,
    error,
  } = useProfile(id);

  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, [user]);

  return (
    <Layout>
      <RStack style={{ gap: 32 }}>
        <Header
          user={user}
          isLoading={isLoading}
          error={error}
          tripsCount={tripsCount}
          packsCount={packsCount}
          favoritesCount={favoritesCount}
          isCurrentUser={isCurrentUser}
        />

        {favoritesQuery?.previewData?.length > 0 ? (
          <UserDataContainer
            resource={favoritesQuery}
            type="favorites"
            userId={user?.id}
            isLoading={isLoading}
            searchTerm={searchTerms.favorites}
            onSearchChange={onSearchChange}
          />
        ) : null}
        {userPacksQuery?.previewData?.length > 0 && (
          <UserDataContainer
            resource={userPacksQuery}
            type="packs"
            userId={user?.id}
            searchTerm={searchTerms.packs}
            onSearchChange={onSearchChange}
          />
        )}
        {userTripsQuery?.previewData?.length > 0 && (
          <UserDataContainer
            resource={userTripsQuery}
            type="trips"
            userId={user?.id}
            searchTerm={searchTerms.packs}
            onSearchChange={onSearchChange}
          />
        )}
      </RStack>
    </Layout>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
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
      color: currentTheme.colors.text,
      textAlign: 'center',
    },
    cardInfo: {
      alignItems: 'center',
    },
    mainContentContainer: {
      width: '100%',
      flex: 1,
    },
  };
};
