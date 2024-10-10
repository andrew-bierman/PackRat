import React from 'react';
import { useNavigationList } from 'app/hooks/navigation';
import { NavigationItem } from './NavigationItem';
import { useIsMobileView } from 'app/hooks/common';
import { View } from 'tamagui';
import useTheme from '../../hooks/useTheme';

type NavigationListProps = {
  itemStyle?: any;
  onItemSelect?: (item: any) => void;
};

export const NavigationList: React.FC<NavigationListProps> = ({
  itemStyle = null,
  onItemSelect = () => {},
}) => {
  const isMobileView = useIsMobileView();
  const { currentTheme, isLight, isDark } = useTheme();
  const { navigationItems } = useNavigationList();
  return (
    <>
      {navigationItems?.map(({ type, ...Item }, index) => {
        const item = Item as any;
        return (
          <View
            style={{
              width: '100%',
              borderRadius: 8,
              marginBottom: isMobileView ? 6 : 0,
              backgroundColor: isDark ? currentTheme.colors.background : '#f0f2f5',
              color: isDark ? currentTheme.colors.white : '#315173',
            }}
            hoverStyle={{
              bg: isDark ? currentTheme.colors.secondaryBlue as any : 'rgb(249, 249, 249)',
            }}
            key={item.href + index}
          >
            {type === 'link' ? (
              <NavigationItem
                item={item}
                itemStyle={itemStyle}
                key={item.href + index}
                onSelect={onItemSelect}
                isMobileView={isMobileView}
              />
            ) : (
              item.Component && <item.Component />
            )}
          </View>
        );
      })}
    </>
  );
};
