import { TouchableOpacity, Text } from 'react-native';
import { useNavigationItem } from 'app/hooks/navigation';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
// import {
//   MaterialCommunityIcons,
//   FontAwesome,
//   MaterialIcons,
//   Entypo,
//   Fontisto,
// } from '@expo/vector-icons';

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
  itemStyle: string;
  isMobileView: boolean;
  onSelect: () => void;
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
    <TouchableOpacity
      style={[
        styles.menuBarItem,
        isCurrentPage && styles.menuBarItemActive,
        !!itemStyle && itemStyle,
      ]}
      onPress={handleItemPress}
      activeOpacity={0.7}
    >
      <IconComponent
        name={icon}
        size={isMobileView ? 24 : 18}
        color={
          isCurrentPage
            ? currentTheme.colors.iconColor
            : currentTheme.colors.iconColor
        }
      />
      <Text
        style={[
          styles.menuBarItemText,
          isCurrentPage && styles.menuBarItemTextActive,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    menuBarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 12,
    },
    menuBarItemText: {
      color: currentTheme.colors.text,
      fontSize: 18,
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
