/* eslint-disable prettier/prettier */
import { useTabItem } from 'app/hooks/navigation';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const TabItem = ({ item, onSelect }) => {
    const { currentTheme } = useTheme();
    const { icon, label, href } = item;
    return (
        <TabButton
          href={href}
          icon={icon}
          label={label}
          color={currentTheme.colors.iconColor}
        />
    );
};


export const TabButton = ({
	icon,
    label,
    color,
    href
}: {
	icon: React.ComponentProps<typeof AntDesign>['name'];
    label: string;
    color: string;
    href: string;
}) => {
    const navigation = useNavigation();

	return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(href)
            }}
        style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
            <AntDesign
                name={icon}
                size={24}
                style={{ marginBottom: 5 }}
                color={color}
		/>
            <Text style={{ color }}>{label}</Text>
        </TouchableOpacity>
	);
};


const loadStyles = (theme) => {
    const { currentTheme } = theme;

    return {
        menuBarItem: {
            justifyContent: "left",
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
