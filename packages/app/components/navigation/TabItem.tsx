/* eslint-disable prettier/prettier */
import { useTabItem } from 'app/hooks/navigation';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const TabItem = ({ item, onSelect }) => {
  const { currentTheme } = useTheme();
  const { IconComponent, isCurrentPage, handleItemPress } = useTabItem(
    item,
    onSelect,
  );
  const { icon, label, href } = item;
  return (
    <TabButton
      href={href}
      icon={icon}
      label={label}
      color={currentTheme.colors.iconColor}
      onPress={handleItemPress}
      IconComponent={IconComponent}
    />
  );
};

export const TabButton = ({
  icon,
  label,
  color,
  href,
  onPress,
  IconComponent,
}: {
  icon: string;
  label: string;
  color: string;
  href: string;
  onPress: any;
  IconComponent: any;
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
      }}
    >
      <IconComponent
        name={icon}
        size={24}
        color={color}
        style={{ marginBottom: 5 }}
      />
      <Text style={{ color }}>{label}</Text>
    </TouchableOpacity>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    menuBarItem: {
      justifyContent: 'left',
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
