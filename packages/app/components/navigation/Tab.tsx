import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { TabList } from './TabList';

export const Tab = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <TabList />}
    ></Tabs>
  );
};
