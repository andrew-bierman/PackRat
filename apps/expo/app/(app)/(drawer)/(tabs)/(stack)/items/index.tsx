import React from 'react';
import { ItemsScreen, GetItemsScreen } from 'app/modules/item';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import useTheme from 'app/hooks/useTheme';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useAuthUser } from 'app/modules/auth';
import { Text } from 'tamagui';
import { useNavigate } from 'app/hooks/navigation';


export default function ItemsPage() {
  const { currentTheme } = useTheme();


  const user = useAuthUser();

  if (user.role === 'user') {
    const navigate = useNavigate();
    navigate('/not-authoried')
    return <Text style={{textAlign: 'center', minHeight: '100vh', marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>Not Available On Me</Text>;

  }

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Items</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Items',
          headerRight: () => (
            <DrawerToggleButton tintColor={currentTheme.colors.tertiaryBlue} />
          ),

          headerStyle: {
            backgroundColor: currentTheme.colors.background,
          },
          headerTitleStyle: {
            fontSize: 24,
          },
          headerTintColor: currentTheme.colors.tertiaryBlue,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      {/* <ItemsScreen /> */}
      <GetItemsScreen />
    </>
  );
}
