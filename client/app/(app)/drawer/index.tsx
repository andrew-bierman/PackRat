import { View, StyleSheet, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { theme, darkTheme } from '../../../theme';
// import { useAuth } from "../../auth/provider";
import UseTheme from '../../../hooks/useTheme';
import { signOut } from '../../../store/authStore';

import { useDispatch, useSelector } from 'react-redux';
import { useSession } from '../../../context/auth';
import useCustomStyles from '~/hooks/useCustomStyles';

export default function Drawer() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  const styles = useCustomStyles(loadStyles);

  const { sessionSignOut } = useSession();
  console.log('isDark, isLight', isDark, isLight);
  // const { signOut } = useAuth();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  /**
   * Handles the sign out functionality.
   *
   * @return {undefined} No return value.
   */
  const handleSignOut = () => {
    dispatch(signOut());
    sessionSignOut();
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: currentTheme.colors.white,
        }}
      >
        <View style={styles.closeIcon}>
          <Link href="/">
            <AntDesign
              name="close"
              size={35}
              color={currentTheme.colors.drawerIconColor}
            />
          </Link>
        </View>
        {user ? (
          <>
            <Link href="/">
              <View style={styles.link}>
                <Entypo
                  name="home"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />

                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  Home
                </Text>
              </View>
            </Link>
            <Link href="/trips">
              <View style={styles.link}>
                <MaterialCommunityIcons
                  name="weather-pouring"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />

                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  Trips
                </Text>
              </View>
            </Link>
            <Link href="profile">
              <View style={styles.link}>
                <FontAwesome
                  name="book"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />
                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  Profile
                </Text>
              </View>
            </Link>
            <Link href="appearance">
              <View style={styles.link}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />
                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  Appearance
                </Text>
              </View>
            </Link>
            <Link href="/packs">
              <View style={styles.link}>
                <MaterialIcons
                  name="backpack"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />

                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  Packs
                </Text>
              </View>
            </Link>
            <Link href="/about">
              <View style={styles.link}>
                <MaterialIcons
                  name="info"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />

                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  About
                </Text>
              </View>
            </Link>
            <View style={styles.link}>
              <MaterialIcons
                name="logout"
                size={24}
                color={currentTheme.colors.drawerIconColor}
              />
              <Text
                style={{ color: currentTheme.colors.drawerIconColor }}
                onPress={() => handleSignOut()}
              >
                Logout
              </Text>
            </View>
          </>
        ) : (
          <View>
            <Link href="/sign-in">
              <View style={styles.link}>
                <MaterialIcons
                  name="login"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />
                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  Login
                </Text>
              </View>
            </Link>
            <Link href="/register">
              <View style={styles.link}>
                <MaterialIcons
                  name="person-add"
                  size={24}
                  color={currentTheme.colors.drawerIconColor}
                />
                <Text style={{ color: currentTheme.colors.drawerIconColor }}>
                  Sign Up
                </Text>
              </View>
            </Link>
          </View>
        )}
      </View>
    </>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    mobileContainer: {
      backgroundColor: currentTheme.colors.background,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 25,
      position: 'relative',
    },

    logo: {
      width: 60,
      height: 50,
    },
    smallLogo: {
      width: 100,
      height: 95,
    },

    link: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      paddingVertical: 20,
      paddingHorizontal: 15,
      width: '100%',
      color: 'black',
    },
    closeIcon: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      paddingVertical: 20,
      paddingHorizontal: 25,
      width: '100%',
      color: 'black',
    },
  };
};
