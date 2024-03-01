import { ComponentProps } from 'react';
import * as ZeegoContextMenu from 'zeego/context-menu';
import RButton from '../RButton';

type ContentProps = ComponentProps<(typeof ZeegoContextMenu)['Content']>;
type ItemProps = ComponentProps<(typeof ZeegoContextMenu)['Item']>;

const ContextMenu = {
  ...ZeegoContextMenu,
  Content: ZeegoContextMenu.create(
    (props: ContentProps) => (
      <ZeegoContextMenu.Content
        {...props}
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 8,
          gap: 10,
          boxShadow: '0px 0px 16px -8px #484848',
        }}
      />
    ),
    'Content',
  ),
  Item: ZeegoContextMenu.create(
    (props: ItemProps) => (
      <ZeegoContextMenu.Item
        {...props}
        style={{
          padding: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          hoverStyle: {
            backgroundColor: 'gray',
          },
        }}
      />
    ),
    'Item',
  ),
};

const ExampleContextMenu = () => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <RButton>Open Menu</RButton>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        {Array.from({ length: 3 }).map((_, i) => (
          <ContextMenu.Item key={`${i}key`}>{`Item ${i}`}</ContextMenu.Item>
        ))}
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

export { ContextMenu, ExampleContextMenu };
