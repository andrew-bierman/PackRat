import { Platform } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';
import { styled } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';


import { RIconButton } from '@packrat/ui';

  
const CustomContent = styled(DropdownMenu.Content, Platform.OS === 'web' ? {
        backgroundColor: 'white',
        minWidth: 160,
        shadowColor: '#000',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        padding: 12,
    } : {
        padding: 10,
        backgroundColor: 'white',
    });
  
  const DropdownMenuContent = DropdownMenu.create(CustomContent, 'Content');
  
  const CustomItem = styled(DropdownMenu.Item,
    {
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      hoverStyle: {
        backgroundColor: 'gray'
      }
    }
  );
  
  const DropdownMenuItem = DropdownMenu.create(CustomItem, 'Item');

  export const ZDropdown = ({ dropdownItems = []}) => {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <RIconButton
            backgroundColor="transparent"
            icon={<MaterialIcons name="more-horiz" size={25} />}
            style={{ padding: 0}}
          />
        </DropdownMenu.Trigger>
        <CustomContent>
          {dropdownItems.map(({label, onSelect = () => {}}) => (
            <CustomItem key={label} onSelect={onSelect()}>
              <DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
            </CustomItem>  
          ))}
        </CustomContent>
      </DropdownMenu.Root>
    );
  }