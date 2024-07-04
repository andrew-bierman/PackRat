import React from 'react';
import { ComponentProps } from 'react';
import * as ZeegoDropdownMenu from 'zeego/dropdown-menu';
import RButton from '../RButton';

type ContentProps = ComponentProps<typeof ZeegoDropdownMenu.Content>;
type ItemProps = ComponentProps<typeof ZeegoDropdownMenu.Item>;

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
          // boxShadow: '0px 0px 16px -8px #484848',
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
          hoverStyle: {
            backgroundColor: 'gray',
          },
        }}
      />
    ),
    'Item',
  ),
};

const RDropdownMenu = ({ menuItems = [], menuName }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RButton>{menuName}</RButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
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
