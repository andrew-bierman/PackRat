import { RDropdownMenu, RStack } from '@packrat/ui';
import React from 'react';

interface FilterBadgeProps {
  menuItems: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const FilterBadge = ({
  menuItems = [],
  selectedValue = '',
  onSelect = () => {},
}: FilterBadgeProps) => {
  return (
    <RStack
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        borderRadius: 20,
      }}
    >
      <RDropdownMenu
        menuItems={menuItems.map((item) => ({
          label: item,
          onSelect: () => onSelect(item),
        }))}
        menuName={selectedValue}
      />
    </RStack>
  );
};

export default FilterBadge;
