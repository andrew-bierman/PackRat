import { useMemo } from 'react';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import {
  Adapt,
  Select,
  Sheet,
  YStack,
  getFontSize,
} from 'tamagui';

export default function RSelect(props) {
  return (
    <SelectItem native {...props} />
  )
}

const extractOptionAttributes = (item, index) => {
  if (typeof item !== 'object' || item === null) return { text: item, value: item, index };
  return {
    text: item.name,
    value: item.id || item._id || item.name,
    index,
  }
}

export function SelectItem(props) {
  const {
    value,
    onValueChange,
    data,
    placeholder,
    ...forwardedProps
  } = props;

  const handleChange = (newValue) => onValueChange && onValueChange(newValue);

  console.log("value, SelectItem", value)

  const options = useMemo(() => {
    if (!data) return null;
    return data
      .map(extractOptionAttributes)
      .map(({ text, value, index }) => (
        <Select.Item
          key={text}
          index={index}
          value={value}
        >
          <Select.ItemText>{text.charAt(0).toUpperCase() + text.slice(1)}</Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <Check size={16} />
          </Select.ItemIndicator>
        </Select.Item>
      ))
  }, [data])

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
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.Viewport
          minWidth={200}
        >
          <Select.Group>
            {options}
          </Select.Group>

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
  )
}
