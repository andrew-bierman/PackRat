import { useMemo, useState } from 'react';
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import { useAuthUser } from '../user/useAuthUser';
import { Platform } from 'react-native';

export const useNavigationList = () => {
  const user = useAuthUser();
  const navigationItems = useMemo(() => {
    const additionalMenuItems = user
      ? logedInMenuItems
      : [
        {
          href: 'sign-in',
          icon: 'login',
          text: 'Login',
          iconSource: MaterialIcons,
        },
        {
          href: 'register',
          icon: 'person-add',
          text: 'Register',
          iconSource: MaterialIcons,
        },
      ];

    return [...staticNavigationItems, ...additionalMenuItems];
  }, [user]);

  return { navigationItems };
};

const staticNavigationItems = [
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
];

const logedInMenuItems = [
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
        href: 'maps',
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
    href: 'logout',
    icon: 'logout',
    text: 'Logout',
    iconSource: MaterialIcons,
  },
];
