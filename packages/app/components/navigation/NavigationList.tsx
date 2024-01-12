import { useNavigationList } from '../../hooks/navigation';
import { NavigationItem } from './NavigationItem';
import { useAuthUser } from '../../hooks/user/useAuthUser';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsMobileView } from '../../hooks/common';

export const NavigationList = ({
  itemStyle = null,
  onItemSelect = () => {},
}) => {
  const isMobileView = useIsMobileView();
  const { navigationItems } = useNavigationList();

  return (
    <>
      {navigationItems?.map((item) => (
        <NavigationItem
          item={item}
          itemStyle={itemStyle}
          key={item.href}
          onSelect={onItemSelect}
          isMobileView={isMobileView}
        />
      ))}
    </>
  );
};
