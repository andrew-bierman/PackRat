import { useMemo } from 'react';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import {
  Adapt,
  Select as OriginalSelect,
  Text,
  YStack,
  getFontSize,
} from 'tamagui';
import { RDropdownMenu } from '../ZDropdown';
import { Platform } from 'react-native';

const Select: any = OriginalSelect;

// Entry point for the Select component
export default function RSelect(props) {
  const { textKey = 'label', valueKey = 'value', ...otherProps } = props;
  return (
    <SelectItem native textKey={textKey} valueKey={valueKey} {...otherProps} />
  );
}

// Function to extract option attributes from data items
const extractOptionAttributes = (item, index, textKey, valueKey) => {
  if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
    return { text: item.toString(), value: item.toString(), index };
  }
  if (typeof item === 'object' && item !== null) {
    return {
      text: item[textKey] ?? item.toString(),
      value: item[valueKey] ?? item.toString(),
      index,
    };
  }
  return { text: 'Invalid Item', value: 'invalid', index };
};

// Component to render the Select dropdown
export function SelectItem(props) {
  const {
    value = '',
    onValueChange,
    data = [],
    placeholder = 'Select an option',
    textKey = 'label',
    valueKey = 'value',
    native,
    ...forwardedProps
  } = props;

  const handleChange = (newValue) => {
    if (typeof onValueChange === 'function') {
      onValueChange(newValue);
    }
  };

  const menuItems = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item, index) => {
      const { text, value, index: itemIndex } = extractOptionAttributes(item, index, textKey, valueKey);
      return {
        label: text.charAt(0).toUpperCase() + text.slice(1),
        onSelect: () => handleChange(value),
      };
    });
  }, [data, textKey, valueKey]);

  return (
    <Select
      value={value}
      disablePreventBodyScroll
      onValueChange={handleChange}
      {...forwardedProps}
    >
      {Platform.OS === 'web' && (
        <>
        <Select.Trigger width={220} iconAfter={ChevronDown}>
          <Select.Value>{value || placeholder}</Select.Value>
        </Select.Trigger>
        <Select.Content zIndex={200000}>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            {menuItems.map(({ label, onSelect }, index) => (
              <Select.Item key={`${label}-${index}`} value={label}>
                <Select.ItemText>{label}</Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <YStack
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
          width={'$4'}
          pointerEvents="none"
        >
          <ChevronDown size={getFontSize((props.size ?? '$true') as any)} />
        </YStack>
      </Select.Content>
      </>
      )}
      {native && (
        <Adapt when="sm" platform="touch">
          <RDropdownMenu menuItems={menuItems} menuName={placeholder} />
        </Adapt>
      ) }
    </Select>
  );
}
