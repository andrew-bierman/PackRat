import { useMemo } from 'react';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import {
  Adapt,
  Select as OriginalSelect,
  Sheet,
  YStack as OriginalYStack,
  getFontSize,
} from 'tamagui';

const YStack: any = OriginalYStack;
const Select: any = OriginalSelect;

// Entry point for the Select component
export default function RSelect(props) {
  // Default key names for text and value, can be overridden by props
  const { textKey = 'label', valueKey = 'value', ...otherProps } = props;

  return (
    <SelectItem native textKey={textKey} valueKey={valueKey} {...otherProps} />
  );
}

// Function to extract option attributes from data items
const extractOptionAttributes = (item, index, textKey, valueKey) => {
  // Handle simple types: strings, numbers, and booleans
  if (
    typeof item === 'string' ||
    typeof item === 'number' ||
    typeof item === 'boolean'
  ) {
    return { text: item.toString(), value: item.toString(), index };
  }

  // Handle objects
  if (typeof item === 'object' && item !== null) {
    return {
      text: item[textKey] ?? item.toString(),
      value: item[valueKey] ?? item.toString(),
      index,
    };
  }

  // Default case for other invalid types
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
        <Select.Item key={`${text} + ${value}`} index={index} value={value}>
          <Select.ItemText>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <Check size={16} />
          </Select.ItemIndicator>
        </Select.Item>
      ));
  }, [data, textKey, valueKey]);

  // Conditional rendering based on options
  if (options.length === 0) {
    return <div>No options available</div>;
  }

  return (
    <Select
      value={value}
      disablePreventBodyScroll
      onValueChange={handleChange}
      {...forwardedProps}
    >
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value>{placeholder}</Select.Value>
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
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
      <Select.Content zIndex={200000}>
        <Select.Viewport minWidth={200}>
          <Select.Group>{options}</Select.Group>

          {props.native && (
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
          )}
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
