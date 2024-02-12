import * as Dropdown from 'zeego/dropdown-menu';
import { ComponentProps, createContext, useContext } from 'react';
import { useCallback, useMemo } from 'react';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import RButton from '../RButton';

const DropdownMenuRoot = Dropdown.Root;

const DropdownMenuTrigger = Dropdown.Trigger;

const DropdownMenuContent = Dropdown.Content;

const DropdownMenuItem = Dropdown.Item;

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
        <RButton>Open</RButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
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
