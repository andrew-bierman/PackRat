/* eslint-disable prettier/prettier */
import { useNavigationItem } from 'app/hooks/navigation';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { DrawerItem } from '@react-navigation/drawer';

interface NavigationItemProps {
  item: {
    href: string;
    icon: string;
    text: string;
    iconSource: any;
    // Possible fix, but doesn't work :|
    // keyof typeof MaterialCommunityIcons.glyphMap
    // | typeof FontAwesome.glyphMap
    // | typeof MaterialIcons.glyphMap
    // | typeof Entypo.glyphMap
    // | typeof Fontisto.glyphMap;
  };
  itemStyle?: string;
  isMobileView: boolean;
  onSelect?: (item: any) => void;
}

export const NavigationItem = ({
  item,
  itemStyle,
  isMobileView,
  onSelect,
}: NavigationItemProps) => {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();
  const { IconComponent, isCurrentPage, handleItemPress } = useNavigationItem(
    item,
    onSelect,
  );
  const { icon, text } = item;

  return (
    <DrawerItem
      icon={() => (
        <IconComponent
          name={icon}
          size={isMobileView ? 24 : 14}
          color={
            isCurrentPage
              ? currentTheme.colors.iconColor
              : currentTheme.colors.iconColor
          }
        />
      )}
      label={text}
      style={[isCurrentPage && styles.menuBarItemActive]}
      labelStyle={[
        styles.menuBarItemText,
        isCurrentPage && styles.menuBarItemTextActive,
      ]}
      onPress={handleItemPress}
    />
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    menuBarItem: {
      justifyContent: 'left',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    menuBarItemText: {
      color: currentTheme.colors.tertiaryBlue,
      fontSize: 15,
    },
    menuBarItemActive: {
      // Apply styles for the active item
      // ...
    },
    menuBarItemTextActive: {
      // Apply styles for the active item's text
      // ...
    },
    menuBarItemSelected: {
      // Apply styles for the selected item
      // ...
    },
  };
};
