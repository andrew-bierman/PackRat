import { RDropdownMenu, RStack } from '@packrat/ui';
import React from 'react';

const FilterBadge = ({ menuItems, selectedValue, onSelect }) => {
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
