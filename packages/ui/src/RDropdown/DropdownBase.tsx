import * as Dropdown from 'zeego/dropdown-menu';
import { ComponentProps, createContext, useContext } from 'react';
import { useCallback, useMemo } from 'react';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import RButton from '../RButton';
import { View } from 'react-native';
import { styled } from 'tamagui';

const DropdownMenuRoot = Dropdown.Root;

const DropdownMenuTrigger = Dropdown.Trigger;

type ContentProps = ComponentProps<(typeof Dropdown)['Content']>;

const CustomContent = styled(Dropdown.Content, {
  padding: 10,
  backgroundColor: 'white',
} as any);

const DropdownMenuContent = Dropdown.create(CustomContent, 'Content');

type ItemProps = React.ComponentProps<(typeof Dropdown)['Item']>;

const CustomItem = styled(Dropdown.Item, {
  padding: 10,
  backgroundColor: 'white',
  flexDirection: 'row',
  alignItems: 'center',
  hoverStyle: {
    backgroundColor: 'gray',
  },
} as any);

const DropdownMenuItem = Dropdown.create(CustomItem, 'Item');

const DropdownMenuItemTitle = Dropdown.ItemTitle;

const DropdownMenuItemIcon = Dropdown.ItemIcon;

const DropdownMenuSeparator = Dropdown.Separator;

const DropdownMenuGroup = Dropdown.Group;

const DropdownMenuCheckboxItem = Dropdown.CheckboxItem;

const DropdownMenuSubTrigger = Dropdown.SubTrigger;

const DropdownMenu = {
  Root: DropdownMenuRoot,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  ItemTitle: DropdownMenuItemTitle,
  Separator: DropdownMenuSeparator,
  Group: DropdownMenuGroup,
  ItemIcon: DropdownMenuItemIcon,
  Trigger: DropdownMenuTrigger,
  CheckboxItem: DropdownMenuCheckboxItem,
  SubTrigger: DropdownMenuSubTrigger,
};

const ExampleDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RButton>Open Dropdown</RButton>
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
        <DropdownMenu.Item key="1">Item 1</DropdownMenu.Item>
        <DropdownMenu.Item key="2">Item 2</DropdownMenu.Item>
        <DropdownMenu.Item key="3">Item 3</DropdownMenu.Item>
        {/* generate 20 more in a loop */}
        {Array.from({ length: 20 }).map((_, i) => (
          <DropdownMenu.Item key={`${i}key`}>{`Item ${i}`}</DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export { DropdownMenu, ExampleDropdown };
