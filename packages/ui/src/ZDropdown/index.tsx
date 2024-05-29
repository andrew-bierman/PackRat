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
  backgroundColor: 'white',
  minWidth: '160px',
  shadowColor: '#000',
  borderRadius: '8px',
  shadowOffset: {
    width: 0,
    height: ' 8px',
  },
  shadowOpacity: 0.2,
  shadowRadius: '16px',
  padding: '8px',
});

const ExtendedDropdownMenuItem =
  DropdownMenu.Item as React.ComponentType<ExtendedDropdownMenuItemProps>;

const CustomItem = styled(ExtendedDropdownMenuItem, {
  padding: 10,
  flexDirection: 'row',
  alignItems: 'center',
  hover: {
    backgroundColor: 'gray',
  },
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
        {dropdownItems.map(({ label, onSelect = () => {} }, index) => (
          <CustomItem key={label} onSelect={onSelect} style={{position : 'realtive',zIndex : 1000, backgroundColor : '#0a84ff'}}>
            <DropdownMenu.ItemTitle style={{color: 'white', padding:'10px' }}>{label}</DropdownMenu.ItemTitle>
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
        {dropdownItems.map(({ label, onSelect = () => {} }, index) => (
          <DropdownMenu.Item key={label} onSelect={onSelect} style={{position : 'realtive',zIndex : 1000, backgroundColor : '#0a84ff'}}>
            <DropdownMenu.ItemTitle style={{color: 'white', padding:'10px' }}>{label}</DropdownMenu.ItemTitle>
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