import { ChevronDown } from '@tamagui/lucide-icons';
import React from 'react';
import { Platform } from 'react-native';
import { Button } from 'tamagui';
import * as ZeegoDropdownMenu from 'zeego/dropdown-menu';
type ContentProps = React.ComponentProps<typeof ZeegoDropdownMenu.Content>;
type ItemProps = React.ComponentProps<typeof ZeegoDropdownMenu.Item>;

const DropdownMenu = {
  ...ZeegoDropdownMenu,
  Content: ZeegoDropdownMenu.create(
    (props: ContentProps) => (
      <ZeegoDropdownMenu.Content
        {...props}
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 8,
          gap: 10,
        }}
      />
    ),
    'Content',
  ),
  Item: ZeegoDropdownMenu.create(
    (props: ItemProps) => (
      <ZeegoDropdownMenu.Item
        {...props}
        style={{
          padding: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          ...Platform.select({
            web: {
              cursor: 'pointer',
              hoverStyle: {
                backgroundColor: 'gray',
              },
            },
          }),
        }}
      />
    ),
    'Item',
  ),
};

interface RDropdownMenuItem {
  label: string;
  onSelect?: () => void;
}

interface RDropdownMenuProps {
  menuItems: RDropdownMenuItem[];
  menuName: string;
  trigger?: React.ReactNode;
}

const RDropdownMenu = ({
  menuItems = [],
  menuName,
  trigger = null,
}: RDropdownMenuProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {React.isValidElement(trigger) ? (
          trigger
        ) : (
          <Button
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 10,
              borderRadius: 40,
            }}
          >
            {menuName}
            <ChevronDown size={14} />
          </Button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        side="bottom"
        align="start"
        sideOffset={5}
        alignOffset={0}
        loop
        avoidCollisions
        collisionPadding={5}
      >
        {menuItems.map(({ label, onSelect = () => {} }) => (
          <DropdownMenu.Item key={label} onSelect={onSelect}>
            <DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export { DropdownMenu, RDropdownMenu };
