import React, { ReactNode } from 'react';
import { MoreHorizontal } from '@tamagui/lucide-icons';
import { Adapt, Button, Popover as OriginalPopover } from 'tamagui';
import { Platform } from 'react-native';

// Bypass TypeScript's type checking on opacity and borderWidth, since component is directly from the library
const Popover: any = OriginalPopover;

interface ThreeDotsMenuProps {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function ThreeDotsMenu({
  children,
  onOpenChange,
  open,
}: ThreeDotsMenuProps) {
  console.log('ksksksks', open);
  return (
    <Popover
      size="$5"
      allowFlip
      placement="bottom"
      onOpenChange={onOpenChange}
      open={Platform.OS != 'web' ? open : undefined}
      disableFocus
    >
      <Popover.Trigger asChild backgroundColor="transparent">
        <Button icon={MoreHorizontal} />
      </Popover.Trigger>
      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame>
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
        padding={4}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <Popover.Close asChild>{children}</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
