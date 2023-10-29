import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { Link, Tabs, useRouter, usePathname } from 'expo-router';
import { Home, Plus } from '@tamagui/lucide-icons';
import {
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import {
  VStack,
  Box,
  Divider,
  IconButton,
  Button,
  Menu,
  ThreeDotsIcon,
} from 'native-base';
import {
  Pressable,
  useColorScheme,
  View,
  Modal,
  StatusBar,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import useCustomStyles from '~/hooks/useCustomStyles';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../store/authStore';
import { darkTheme, theme } from '../../../theme';
import Drawer from '../../../screens/Drawer';
import useTheme from '../../../hooks/useTheme';
import { ChevronRight, Cloud, Moon, Star, Sun } from '@tamagui/lucide-icons';
import { ListItem, Separator, XStack, YGroup } from 'tamagui';
import { useSession } from '../../../context/auth';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '/tabs',
};

export default function TabLayout() {
  const {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme = theme,
  } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { sessionSignOut } = useSession();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const user = useSelector((state) => state.auth.user);
  const [selectedNavItem, setSelectedNavItem] = useState('');
  const styles = useCustomStyles(loadStyles);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleModal = () => {
    setCreateModalVisible(!isCreateModalVisible);
  };

  const hiddenTabs = [
    'about/index',
    'feed/index',
    'items/index',
    'trips/create',
    'packs/create',
    'packs/index',
    'appearance/index',
    'maps/index',
  ];

  const staticNavigationItems = useMemo(
    () => [
      {
        href: '/',
        icon: 'home',
        text: 'Home',
        iconSource: Entypo,
      },
      {
        href: '/about',
        icon: 'info',
        text: 'About',
        iconSource: MaterialIcons,
      },
    ],
    [],
  );

  const userNavigationItems = useMemo(
    () =>
      user
        ? [
            {
              href: '/feed',
              icon: 'newspaper-variant',
              text: 'Feed',
              iconSource: MaterialCommunityIcons,
            },
            {
              href: '/trips',
              icon: 'routes',
              text: 'Trips',
              iconSource: MaterialCommunityIcons,
            },
            {
              href: '/packs',
              icon: 'backpack',
              text: 'Packs',
              iconSource: MaterialIcons,
            },
            ...(Platform.OS != 'web'
              ? [
                  {
                    href: '/maps',
                    icon: 'map',
                    text: 'Downloaded Maps',
                    iconSource: Entypo,
                  },
                ]
              : []),
            {
              href: '/items',
              icon: 'tent',
              text: 'Items',
              iconSource: Fontisto,
            },
            {
              href: '/profile',
              icon: 'book',
              text: 'Profile',
              iconSource: FontAwesome,
            },
            {
              href: '/appearance',
              icon: 'theme-light-dark',
              text: 'Appearance',
              iconSource: MaterialCommunityIcons,
            },
            {
              href: '/logout',
              icon: 'logout',
              text: 'Logout',
              iconSource: MaterialIcons,
            },
          ]
        : [
            {
              href: '/sign-in',
              icon: 'login',
              text: 'Login',
              iconSource: MaterialIcons,
            },
            {
              href: '/register',
              icon: 'person-add',
              text: 'Register',
              iconSource: MaterialIcons,
            },
          ],
    [user],
  );
  useEffect(() => {}, []);
  const navigationItems = [...staticNavigationItems, ...userNavigationItems];

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'green',
        }}
      >
        <Tabs.Screen
          name="home-tab"
          options={{
            href: '/tabs/home-tab',
            title: 'PACKRAT',
            tabBarLabel: 'HOME',
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <TabBarIcon name="home" color={color} size={24} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="trips/index"
          options={{
            href: '/tabs/trips',
            title: 'TRIPS',
            tabBarLabel: 'TRIPS',
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <MaterialIcons name="directions" color={color} size={24} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="_create"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              toggleModal();
            },
          })}
          options={{
            title: '',
            tabBarIcon: ({ size }) => {
              return (
                <View style={styles.tabIcon}>
                  <TouchableOpacity onPress={toggleModal}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: 'green',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Plus color="$color" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Account',
            headerShown: true,
            tabBarLabel: 'ACCOUNT',
            href: {
              pathname: '/tabs/profile',
            },
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <TabBarIcon name="user" color={color} size={24} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="_more"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              toggleDrawer();
            },
          })}
          options={{
            title: '',
            headerShown: false,
            tabBarLabel: 'MORE',
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <TabBarIcon name="ellipsis-v" color={color} size={24} />
              </View>
            ),
          }}
        />
        {hiddenTabs.map((name) => (
          <Tabs.Screen
            key={name}
            // Name of the route to hide.
            name={name}
            options={{
              // This tab will no longer show up in the tab bar.
              href: null,
            }}
          />
        ))}
      </Tabs>
      <Modal visible={isDrawerOpen} animationType="slide" transparent={true}>
        <Drawer
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          navigationItems={navigationItems}
          position="left"
        />
      </Modal>
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text>Quick Items</Text>
            </View>
            <YGroup
              alignSelf="center"
              bordered
              width="100%"
              marginBottom={20}
              marginTop={30}
              size="$5"
              separator={<Separator />}
            >
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  pressTheme
                  title="Packs"
                  subTitle="Packing List"
                  onPress={() => {
                    router.push('/tabs/packs');
                    toggleModal();
                  }}
                  icon={
                    <MaterialIcons
                      name="backpack"
                      style={{ fontSize: 28, color: '#34a89a' }}
                    />
                  }
                  iconAfter={ChevronRight}
                />
              </YGroup.Item>
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  pressTheme
                  title="Weather Forcast"
                  subTitle="Up-to-date weather forcast"
                  icon={
                    <MaterialIcons
                      name="wb-sunny"
                      style={{ fontSize: 28, color: '#34a89a' }}
                    />
                  }
                  iconAfter={ChevronRight}
                />
              </YGroup.Item>
            </YGroup>
            <Button
              style={{ backgroundColor: '#34a89a' }}
              onPress={toggleModal}
            >
              <Text>Close Modal</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      ...Platform.select({
        ios: {
          paddingTop: StatusBar.currentHeight, // Adjust for status bar
        },
      }),
    },
    tabIcon: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 2,
      backgroundColor: 'transparent',
    },
    modalContent: {
      width: Dimensions.get('window').width,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    menuBarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 12,
    },
    menuBarItemActive: {
      // Apply styles for the active item
      // ...
    },
    menuBarItemText: {
      color: currentTheme.colors.text,
      fontSize: 18,
    },
    menuBarItemTextActive: {
      // Apply styles for the active item's text
      // ...
    },
    menuBarItemSelected: {
      // Apply styles for the selected item
      // ...
    },
    menuBarItemTextSelected: {
      // Apply styles for the selected item's text
      // ...
    },
  };
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size || 26}
      style={{ marginBottom: -2 }}
      {...props}
    />
  );
}
