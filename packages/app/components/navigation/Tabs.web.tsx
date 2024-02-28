import React from 'react';
import { Tabs as ExpoTabs } from 'expo-router/tabs';
import { TabList } from './TabList';

export const Tabs = () => {
  return (
    <ExpoTabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <TabList />}
    />
  );
};
