import { Chip, RDropdownMenu } from '@packrat/ui';
import { ChevronDown } from '@tamagui/lucide-icons';
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
    <RDropdownMenu
      menuItems={menuItems.map((item) => ({
        label: item,
        onSelect: () => onSelect(item),
      }))}
      menuName={selectedValue}
      trigger={
        <Chip rounded theme="primary" size="small" key={selectedValue}>
          <Chip.Text>{selectedValue}</Chip.Text>
          <Chip.Icon>
            <ChevronDown size={14} />
          </Chip.Icon>
        </Chip>
      }
    />
  );
};

export default FilterBadge;
