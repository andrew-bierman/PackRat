import * as DropdownMenu from 'zeego/dropdown-menu';
import { styled } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { ViewProps } from 'react-native';

import RIconButton from '../RIconButton';

interface ExtendedDropdownMenuProps extends ViewProps {
  css?: string;
}

interface ExtendedDropdownMenuItemProps extends ViewProps {
  css?: string;
  onSelect?: () => void;
}

const ExtendedDropdownMenuContent =
  DropdownMenu.Content as React.ComponentType<ExtendedDropdownMenuProps>;

const CustomContent = styled(ExtendedDropdownMenuContent, {
  css: `
    background-color: white;
    min-width: 160px;
    shadow-color: #000;
    border-radius: 8px;
    shadow-offset: {
      width: 0;
      height: 8px;
    };
    shadow-opacity: 0.2;
    shadow-radius: 16px;
    padding: 12px;
  `,
});

const ExtendedDropdownMenuItem =
  DropdownMenu.Item as React.ComponentType<ExtendedDropdownMenuItemProps>;

const CustomItem = styled(ExtendedDropdownMenuItem, {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    hover :{
      backgroundColor: "gray",
    }
});

const DropdownMenuItem = DropdownMenu.create(CustomItem, 'Item');

export const ZDropdownWeb = ({ dropdownItems = [] }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RIconButton
          backgroundColor="transparent"
          icon={<MaterialIcons name="more-horiz" size={25} />}
          style={{ padding: 0 }}
        />
      </DropdownMenu.Trigger>
      <CustomContent>
        {dropdownItems.map(({ label, onSelect = () => {} }) => (
          <CustomItem key={label} onSelect={onSelect}>
            <DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
          </CustomItem>
        ))}
      </CustomContent>
    </DropdownMenu.Root>
  );
};

export const ZDropdownNative = ({ dropdownItems = [] }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RIconButton
          backgroundColor="transparent"
          icon={<MaterialIcons name="more-horiz" size={25} />}
          style={{ padding: 0 }}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {dropdownItems.map(({ label, onSelect = () => {} }) => (
          <DropdownMenu.Item key={label} onSelect={onSelect}>
            <DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default {
  Web: ZDropdownWeb,
  Native: ZDropdownNative,
};
