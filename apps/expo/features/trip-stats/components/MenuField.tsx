import { createDropdownItem, DropdownMenu } from '@packrat/ui/src/dropdown-menu';
import { Text } from '@packrat/ui/src/text';
import { Icon } from 'expo-app/components/Icon';
import { useColorScheme } from 'expo-app/lib/hooks/useColorScheme';
import { View } from 'react-native';

/**
 * Material 3 exposed dropdown menu: a field showing the current choice that opens the native
 * menu of options beneath it. M3's single-select control when there are too many options for
 * segmented buttons.
 */
export function MenuField<T extends string>({
  label,
  options,
  value,
  onChange,
  optionLabel,
  testIDFor,
}: {
  label: string;
  options: readonly T[];
  value: NoInfer<T>;
  onChange: (value: NoInfer<T>) => void;
  optionLabel: (value: NoInfer<T>) => string;
  testIDFor: (value: NoInfer<T>) => string;
}) {
  const { colors } = useColorScheme();
  return (
    <View className="px-4 py-2">
      <DropdownMenu
        items={options.map((option) =>
          createDropdownItem({ actionKey: option, title: optionLabel(option) }),
        )}
        onItemPress={(item) => {
          const picked = options.find((option) => option === item.actionKey);
          if (picked) onChange(picked);
        }}
      >
        {/* A plain View: the menu wraps its trigger in its own Pressable. */}
        <View
          testID={testIDFor(value)}
          accessible
          accessibilityRole="button"
          accessibilityLabel={`${label}: ${optionLabel(value)}`}
          className="min-h-14 flex-row items-center rounded-md border px-3"
          style={{ borderColor: colors.grey3 }}
        >
          <Text
            variant="caption1"
            className="absolute -top-2.5 left-2 px-1"
            style={{ backgroundColor: colors.background, color: colors.grey }}
          >
            {label}
          </Text>
          <Text variant="body" className="flex-1">
            {optionLabel(value)}
          </Text>
          <Icon name="menu-down" size={24} color={colors.grey} />
        </View>
      </DropdownMenu>
    </View>
  );
}
