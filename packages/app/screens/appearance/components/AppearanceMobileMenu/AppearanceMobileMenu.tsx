import React, { cloneElement, ReactElement } from 'react';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Adapt, Button, Popover, Text } from 'tamagui';

export function AppearanceMobileMenu({
  navigationList,
}: {
  navigationList: ReactElement;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onPress={() => setIsOpen(true)} icon={ChevronDown}>
        <Text>Components</Text>
      </Button>
      <Popover size="$5" allowFlip onOpenChange={setIsOpen} open={isOpen}>
        <Adapt when="sm" platform="touch">
          <Popover.Sheet modal dismissOnSnapToBottom>
            <Popover.Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Popover.Sheet.Frame>
            <Popover.Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Popover.Sheet>
        </Adapt>

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          elevate
          style={{ padding: 0, width: 250 }}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
          {cloneElement(navigationList, {
            onPressItem: () => {
              setIsOpen(false);
            },
          })}
        </Popover.Content>
      </Popover>
    </>
  );
}
