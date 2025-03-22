import React from 'react';
import { useNavigationList } from 'app/hooks/navigation';
import { NavigationItem } from '../NavigationItem';
import { useIsMobileView } from 'app/hooks/common';
import { View } from 'tamagui';
import useTheme from '../../../hooks/useTheme';

interface SidebarNavigationListProps {
  itemStyle?: Record<string, any>;
  onItemSelect?: (item: unknown) => void;
}

export const SidebarNavigationList: React.FC<SidebarNavigationListProps> = ({
  itemStyle,
  onItemSelect,
}) => {
  const isMobileView = useIsMobileView();
  const { currentTheme } = useTheme();
  const { navigationItems } = useNavigationList();

  return (
    <>
      {navigationItems
        ?.filter(
          (item: any) =>
            item.href !== '/profile' &&
            item.href !== '/logout' &&
            item.type !== 'divider',
        )
        .map(({ type, ...Item }: any, index) => {
          const item = Item as any;
          return (
            <View
              style={{
                width: '100%',
                borderRadius: 8,
                marginBottom: isMobileView ? 6 : 0,
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.white,
              }}
              hoverStyle={{
                bg: currentTheme.colors.secondaryBlue as any,
              }}
              key={item.href + index}
            >
              {type === 'link' ? (
                <NavigationItem
                  item={item}
                  itemStyle={itemStyle as any}
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
