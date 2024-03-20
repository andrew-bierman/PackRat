import { useNavigationList } from 'app/hooks/navigation';
import { NavigationItem } from './NavigationItem';
import { useIsMobileView } from 'app/hooks/common';
import { View } from 'tamagui';
import useTheme from '../../hooks/useTheme';

export const NavigationList = ({
  itemStyle = null,
  onItemSelect = () => {},
}) => {
  const isMobileView = useIsMobileView();
  const { currentTheme } = useTheme();
  const { navigationItems } = useNavigationList();
  return (
    <>
      {navigationItems?.map(({ type, ...Item }) => {
        return (
          <View
          style={ {
            width: '100%',
            borderRadius: 8,
          }}
          hoverStyle={ {
            bg: currentTheme.colors.secondaryBlue,
          }}
            key={Item.href}
          >
            {type === 'link' ? (
              <NavigationItem
                item={Item}
                itemStyle={itemStyle}
                key={Item.href}
                onSelect={onItemSelect}
                isMobileView={isMobileView}
              />
            ) : (
              <Item.Component />
            )}
          </View>
        );
      })}
    </>
  );
};
