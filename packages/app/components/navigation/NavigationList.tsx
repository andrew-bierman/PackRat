import { useNavigationList } from 'app/hooks/navigation';
import { NavigationItem } from './NavigationItem';
import { useIsMobileView } from 'app/hooks/common';

export const NavigationList = ({
  itemStyle = null,
  onItemSelect = () => {},
}) => {
  const isMobileView = useIsMobileView();
  const { navigationItems } = useNavigationList();
  return (
    <>
      {navigationItems?.map(({ type, ...Item }) => {
        return (
            {type === 'link' ? (
              <NavigationItem
                item={Item}
                itemStyle={itemStyle}
                key={Item.href}
                onSelect={onItemSelect}
                isMobileView={isMobileView}
              />
            ) : (
              <Item.component />
            )}
        );
      })}
    </>
  );
};
