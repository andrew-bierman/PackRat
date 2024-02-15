import React from 'react';
import { Platform, View } from 'react-native';
import { RIconButton, RStack, RText, RSkeleton } from '@packrat/ui';
import { ScrollView } from 'react-native-gesture-handler';
import UserDataContainer from '../../components/user/UserDataContainer';
import useTheme from '../../hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import Avatar from '../../components/Avatar/Avatar';
import { useProfile } from 'app/hooks/user';
import { loadStyles } from './ProfileContainer.style';
import {
  SettingsButton,
  SkeletonUserDataCard,
} from './ProfileContainerComponents';
import { useUserData } from './useUserData';

interface LoadingStateProps {
  isLoading: boolean;
  skeleton: JSX.Element;
  content: JSX.Element;
}
const useLoadingState = ({
  isLoading,
  skeleton,
  content,
}: LoadingStateProps) => {
  return isLoading ? skeleton : content;
};

interface UserInfoProps {
  isLoading: boolean;
  user: any;
}

const UserInfo = ({ isLoading, user }: UserInfoProps) => {
  const styles = useCustomStyles(loadStyles);
  const { profileImage, userRealName, username } = useUserData(user, isLoading);
  const skeleton = (
    <>
      <RSkeleton style={{ borderRadius: '100%', height: 100, width: 100 }} />
      <RSkeleton
        style={{
          height: 100,
          width: '100%',
          marginTop: 8,
          alignItems: 'center',
        }}
      />
    </>
  );
  const content = (
    <>
      <Avatar src={user?.profileImage} />
      <RText style={{ marginTop: 16, ...styles.userName }}>
        {userRealName}
      </RText>
      <RText style={styles.userEmail}>{username}</RText>
    </>
  );
  return useLoadingState({ isLoading, skeleton, content });
};

interface CardInfoProps {
  isLoading: boolean;
  tripsCount: number;
  packsCount: number;
  favoritesCount: number;
  user: any;
  currentTheme: any;
}

const CardInfo = ({
  isLoading,
  tripsCount,
  packsCount,
  favoritesCount,
  user,
  currentTheme,
}: CardInfoProps) => {
  const styles = useCustomStyles(loadStyles);
  const skeleton = (
    <>
      <RSkeleton style={{ borderRadius: '100%', width: 50, height: 50 }} />
      <RSkeleton style={{ borderRadius: '100%', width: 50, height: 50 }} />
      <RSkeleton style={{ borderRadius: '100%', width: 50, height: 50 }} />
      <RSkeleton style={{ borderRadius: '100%', width: 50, height: 50 }} />
    </>
  );
  const content = (
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
        <RText color={currentTheme.colors.textColor}>{favoritesCount}</RText>
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
  );
  return useLoadingState({ isLoading, skeleton, content });
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

  return (
    <View style={{ width: '90%', ...styles.infoSection }}>
      <RStack
        style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}
      >
        {isCurrentUser && !isLoading && (
          <View style={{ alignSelf: 'flex-start', marginLeft: 'auto' }}>
            <SettingsButton />
          </View>
        )}
        <RStack style={{ alignItems: 'center', flex: '1' }}>
          <View style={styles.userInfo}>
            <UserInfo isLoading={isLoading} user={user} />
          </View>
        </RStack>
        {isCurrentUser && !isLoading && <View style={{ width: 45 }} />}
      </RStack>
      <RStack style={{ flexDirection: 'row', ...styles.card }}>
        <CardInfo
          isLoading={isLoading}
          tripsCount={tripsCount}
          packsCount={packsCount}
          favoritesCount={favoritesCount}
          user={user}
          currentTheme={currentTheme}
        />
      </RStack>
      {error ? <RText>{error}</RText> : null}
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
      <ScrollView nestedScrollEnabled={true}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RStack
            style={[
              styles.mainContainer,
              Platform.OS == 'web'
                ? { minHeight: '100vh' }
                : { minHeight: '100%' },
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
                    userId={user?._id}
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
                    userId={user?._id}
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
      </ScrollView>
    </View>
  );
}
