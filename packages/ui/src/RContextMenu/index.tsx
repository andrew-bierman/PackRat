import { ComponentProps } from 'react';
import * as ZeegoContextMenu from 'zeego/context-menu';
import RButton from '../RButton';
import RText from '../RText';

type ContentProps = ComponentProps<(typeof ZeegoContextMenu)['Content']>;
type ItemProps = ComponentProps<(typeof ZeegoContextMenu)['Item']>;

interface MenuItems{
  label: string,
  onSelect: () => void,
}

const ContextMenu = {
  ...ZeegoContextMenu,
  Content: ZeegoContextMenu.create(
    (props: ContentProps) => (
      <ZeegoContextMenu.Content
        {...props}
        style={
          {
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 8,
            gap: 10,
            boxShadow: '0px 0px 16px -8px #484848',
          } as any
        }
      />
    ),
    'Content',
  ),
  Item: ZeegoContextMenu.create(
    (props: ItemProps) => (
      <ZeegoContextMenu.Item
        {...props}
        style={
          {
            padding: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            hoverStyle: {
              backgroundColor: 'gray',
            },
          } as any
        }
      />
    ),
    'Item',
  ),
};

const RContextMenu = ({menuItems = [], menuName}: {menuItems: MenuItems[], menuName: React.ReactNode}) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <RButton>{menuName}</RButton>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        {menuItems.map(({label, onSelect=()=> {}}) => (
          <ContextMenu.Item key={label} onSelect={onSelect} >
        <ContextMenu.ItemTitle>{label}</ContextMenu.ItemTitle>

          </ContextMenu.Item>
        ))}
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

export { ContextMenu, RContextMenu };
