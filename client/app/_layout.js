import { Slot, Tabs } from 'expo-router';
import { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';

import Navigation from '../screens/Navigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store/store';

import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import FlashMessage from 'react-native-flash-message';
import Footer from '../components/footer/Footer';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const WebLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <Slot />
      <Footer />
    </View>
  );
};

const MobileLayout = () => {
  return (
    <Tabs initialRouteName="home">
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          tabBarStyle: Platform.OS === 'ios' && {
            backgroundColor: 'transparent',
          },
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="_feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="_profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        // Name of the route to hide.
        name="(app)"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="(auth)"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      {/* <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => {
              const { avatarUrl } = useUser()
              return (
                <YStack borderWidth="$1" borderColor={color} borderRadius="$10">
                  <Avatar circular p="$1" size={size}>
                    <SolitoImage src={avatarUrl} alt="your avatar" width={size} height={size} />
                  </Avatar>
                </YStack>
              )
            },
          }}
        /> */}
    </Tabs>
  );
};

const Layout = () => {
  return Platform.OS === 'web' ? <WebLayout /> : <MobileLayout />;
};

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <ThemeProvider>
            <Layout />
          </ThemeProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
