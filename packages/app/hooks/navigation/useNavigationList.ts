import { useMemo, useState } from 'react';
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import { useAuthUser } from 'app/modules/auth';
import { Platform } from 'react-native';
import { Separator } from 'tamagui';

enum NavigationItemTypeEnum {
  LINK = 'link',
  DIVIDER = 'divider',
}

type NavigationItem =
  | {
      type: NavigationItemTypeEnum.LINK;
      href: string;
      icon: string;
      text: string;
      iconSource: any;
    }
  | {
      type: NavigationItemTypeEnum.DIVIDER;
      Component: React.ComponentType<any>;
    };

export const useNavigationList = () => {
  const user = useAuthUser();
  const logedInMenuItems: NavigationItem[] = [
    {
      type: NavigationItemTypeEnum.LINK,
      href: '/feed',
      icon: 'newspaper-variant',
      text: 'Feed',
      iconSource: MaterialCommunityIcons,
    },
    {
      type: NavigationItemTypeEnum.LINK,
      href: '/trips',
      icon: 'routes',
      text: 'Trips',
      iconSource: MaterialCommunityIcons,
    },
    {
      type: NavigationItemTypeEnum.LINK,
      href: '/packs',
      icon: 'backpack',
      text: 'Packs',
      iconSource: MaterialIcons,
    },
    // ...((Platform.OS != 'web'
    //   ? [
    //       {
    //         type: NavigationItemTypeEnum.LINK,
    //         href: '/maps',
    //         icon: 'map',
    //         text: 'Downloaded Maps',
    //         iconSource: Entypo,
    //       },
    //     ]
    //   : []) as NavigationItem[]),
    {
      type: NavigationItemTypeEnum.LINK,
      href: '/products',
      icon: 'tent',
      text: 'Products',
      iconSource: Fontisto,
    },
    ...((user?.role === 'admin'
      ? [
          {
            type: NavigationItemTypeEnum.LINK,
            href: '/items',
            icon: 'map',
            text: 'items',
            iconSource: Fontisto,
          },
        ]
      : []) as NavigationItem[]),
    {
      type: NavigationItemTypeEnum.LINK,
      href: '/profile',
      icon: 'book',
      text: 'Profile',
      iconSource: FontAwesome,
    },
    {
      type: NavigationItemTypeEnum.DIVIDER,
      Component: Separator,
    },
    // DISABLE SCREEN TEMP
    // {
    //   type: NavigationItemTypeEnum.LINK,
    //   href: '/appearance',
    //   icon: 'theme-light-dark',
    //   text: 'Appearance',
    //   iconSource: MaterialCommunityIcons,
    // },
    {
      type: NavigationItemTypeEnum.LINK,
      href: '/logout',
      icon: 'logout',
      text: 'Logout',
      iconSource: MaterialIcons,
    },
  ];
  const navigationItems = useMemo(() => {
    const additionalMenuItems = user ? logedInMenuItems : loggeOutMenuItems;

    return [...staticNavigationItems, ...additionalMenuItems];
  }, [user]);

  return { navigationItems };
};

const staticNavigationItems = [
  {
    type: NavigationItemTypeEnum.LINK,
    href: '/',
    icon: 'home',
    text: 'Home',
    iconSource: Entypo,
  },
  {
    type: NavigationItemTypeEnum.LINK,
    href: '/about',
    icon: 'info',
    text: 'About',
    iconSource: MaterialIcons,
  },
];

const loggeOutMenuItems: NavigationItem[] = [
  {
    type: NavigationItemTypeEnum.DIVIDER,
    Component: Separator,
  },
  {
    type: NavigationItemTypeEnum.LINK,
    href: '/sign-in',
    icon: 'login',
    text: 'Login',
    iconSource: MaterialIcons,
  },
  {
    type: NavigationItemTypeEnum.LINK,
    href: '/register',
    icon: 'person-add',
    text: 'Register',
    iconSource: MaterialIcons,
  },
];
