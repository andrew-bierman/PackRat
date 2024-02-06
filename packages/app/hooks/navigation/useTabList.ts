import { useMemo } from 'react';
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { useAuthUser } from 'app/auth/hooks';

export const useTabList = () => {
  const user = useAuthUser();
  const tabItems = useMemo(() => {
    const additionalMenuItems = user
      ? logedInMenuItems
      : [
          {
            href: '/sign-in',
            icon: 'login',
            label: 'Login',
          },
          {
            href: 'register',
            icon: 'person-add',
            label: 'Register',
          },
        ];

    return [...additionalMenuItems];
  }, [user]);

  return { tabItems };
};

const logedInMenuItems = [
  {
    href: '/',
    icon: 'home',
    label: 'Home',
    iconSource: AntDesign,
  },
  {
    href: '/profile',
    icon: 'profile',
    label: 'Profile',
    iconSource: AntDesign,
  },
  {
    href: '/feed',
    icon: 'newspaper-variant-outline',
    label: 'Feed',
    iconSource: MaterialCommunityIcons,
  },
];
