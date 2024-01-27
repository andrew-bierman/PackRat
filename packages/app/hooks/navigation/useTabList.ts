import { useMemo } from 'react';
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { useAuthUser } from '../user/useAuthUser';

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
  },
  {
    href: '/profile',
    icon: 'profile',
    label: 'Profile',
  },
];
