import { EvilIcons } from '@expo/vector-icons';
import { useLogout } from 'app/modules/auth';
import { useTab } from './useTab';
export const useTabItem = (item, onSelect) => {
  const logout = useLogout();
  const tab = useTab();
  const { iconSource, href } = item;
  const IconComponent = iconSource || EvilIcons;
  const isCurrentPage = true;

  const handleItemPress = () => {
    if (item.href === '/logout') {
      logout();
      tab('/');
      return;
    }
    onSelect?.();
    tab(item.href);
  };

  return { IconComponent, isCurrentPage, handleItemPress, href };
};
