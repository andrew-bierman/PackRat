import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import React, { useMemo, useState } from 'react';

import {
  Adapt,
  Label,
  Select as OriginalSelect,
  Sheet as OriginalSheet,
  XStack,
  YStack as OriginalYStack,
  getFontSize,
} from 'tamagui';

// import { LinearGradient } from 'tamagui/linear-gradient'

const Select: any = OriginalSelect;
const Sheet: any = OriginalSheet;
const YStack: any = OriginalYStack;

export function SelectDemo() {
  return (
    <YStack space>
      <XStack ai="center" space>
        <Label f={1} fb={0}>
          Custom
        </Label>

        <SelectDemoItem />
      </XStack>
      <XStack ai="center" space>
        <Label f={1} fb={0}>
          Native
        </Label>

        {/* <SelectDemoItem native /> */}
        <SelectDemoItem />
      </XStack>
    </YStack>
  );
}
// @ts-nocheck - may need to be at the start of file

export function SelectDemoItem(SelectProps = {}, props) {
  const [val, setVal] = useState('apple');
  return (
    <Select id="food" value={val} onValueChange={setVal} {...props}>
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
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
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>

          {/* <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', '$backgroundTransparent']}
            borderRadius="$4"
          /> */}
        </Select.ScrollUpButton>
        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Fruits</Select.Label>

            {/* for longer lists memoizing these is useful */}

            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>

                      <Select.ItemIndicator marginLeft="auto">
                        {/* <Check size={16} /> */}
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),

              [items],
            )}
          </Select.Group>

          {/* Native gets an extra icon */}

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
              <ChevronDown size={getFontSize(props.size ?? '$true')} />
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>

          {/* <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$backgroundTransparent', '$background']}
            borderRadius="$4"
          /> */}
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
const items = [
  { name: 'Apple' },

  { name: 'Pear' },

  { name: 'Blackberry' },

  { name: 'Peach' },

  { name: 'Apricot' },

  { name: 'Melon' },

  { name: 'Honeydew' },

  { name: 'Starfruit' },

  { name: 'Blueberry' },

  { name: 'Raspberry' },

  { name: 'Strawberry' },

  { name: 'Mango' },

  { name: 'Pineapple' },

  { name: 'Lime' },

  { name: 'Lemon' },

  { name: 'Coconut' },

  { name: 'Guava' },

  { name: 'Papaya' },

  { name: 'Orange' },

  { name: 'Grape' },

  { name: 'Jackfruit' },

  { name: 'Durian' },
];
