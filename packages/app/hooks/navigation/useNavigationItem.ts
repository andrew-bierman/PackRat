import { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { useLogout } from 'app/modules/auth';
import { useNavigate } from './useNavigate';

export const useNavigationItem = (item, onSelect) => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { iconSource, href } = item;
  const IconComponent = iconSource || EvilIcons;
  // TODO: add current page logic
  // const isCurrentPage = pathname === href;
  const isCurrentPage = true;

  const handleItemPress = () => {
    if (item.href === '/logout') {
      logout();
      navigate('/');
      return;
    }
    onSelect?.();
    navigate(item.href);
  };

  return { IconComponent, isCurrentPage, handleItemPress };
};
