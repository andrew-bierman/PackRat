import React, { useMemo, useState } from 'react';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import {
  Adapt,
  Select as OriginalSelect,
  Sheet,
  YStack as OriginalYStack,
  getFontSize,
  Text,
} from 'tamagui';
import { RDropdownMenu } from '../ZDropdown';

const YStack: any = OriginalYStack;
const Select: any = OriginalSelect;

export default function RSelect(props) {
  const {
    textKey = 'label',
    valueKey = 'value',
    native = false,
    ...otherProps
  } = props;

  return (
    <SelectItem
      native={native}
      textKey={textKey}
      valueKey={valueKey}
      {...otherProps}
    />
  );
}

const extractOptionAttributes = (item, index, textKey, valueKey) => {
  if (
    typeof item === 'string' ||
    typeof item === 'number' ||
    typeof item === 'boolean'
  ) {
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

export function SelectItem(props) {
  const {
    value = '',
    onValueChange,
    data = [],
    placeholder = 'Select an option',
    textKey = 'label',
    valueKey = 'value',
    native = false,
    ...forwardedProps
  } = props;

  const handleChange = (newValue) => {
    if (typeof onValueChange === 'function') {
      onValueChange(newValue);
    }
  };

  const options = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data
      .map((item, index) =>
        extractOptionAttributes(item, index, textKey, valueKey),
      )
      .map(({ text, value, index }) => (
        <Select.Item
          style={{ backgroundColor: '$color5' }}
          key={`${text} + ${value}`}
          index={index}
          value={value}
        >
          <Select.ItemText>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <Check size={16} />
          </Select.ItemIndicator>
        </Select.Item>
      ));
  }, [data, textKey, valueKey]);

  if (options.length === 0) {
    return <Text>No options available</Text>;
  }

  const [position, setPosition] = useState(0);

  const selectedItemLabel = useMemo(() => {
    const label = data.find((i) => i[valueKey] === value)?.[textKey];
    return label || value;
  }, [value]);

  return (
    <Select
      value={value}
      disablePreventBodyScroll
      onValueChange={handleChange}
      {...forwardedProps}
    >
      <Select.Trigger style={{ backgroundColor: '$color5' }}>
        <Select.Value style={{ backgroundColor: '$color5' }}>
          {selectedItemLabel ?? placeholder}
        </Select.Value>
      </Select.Trigger>
      <Select.Content zIndex={200000}>
        <Select.Viewport minWidth={200}>
          <Select.Group>{options}</Select.Group>
        </Select.Viewport>
      </Select.Content>
      {native && (
        <Adapt when="sm" platform="touch">
          <Sheet
            native
            modal
            snapPointsMode="fit"
            position={position}
            onPositionChange={setPosition}
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 } as any}
              exitStyle={{ opacity: 0 } as any}
            />
          </Sheet>
        </Adapt>
      )}
    </Select>
  );
}
