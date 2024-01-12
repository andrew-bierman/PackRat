import { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { useLogout } from '../login';
import { useNavigate } from './useNavigate';

export const useNavigationItem = (item, onSelect) => {
  const pathname = usePathname();
  const logout = useLogout();
  const navigate = useNavigate();
  const { iconSource, href } = item;
  const IconComponent = iconSource || EvilIcons;
  const isCurrentPage = pathname === href;

  const handleItemPress = () => {
    if (item.href === 'logout') {
      logout();
      return;
    }
    onSelect?.();
    navigate(item.href);
  };

  return { IconComponent, isCurrentPage, handleItemPress };
};
