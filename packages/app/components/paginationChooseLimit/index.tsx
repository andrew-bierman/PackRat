import { View } from 'react-native';
import React, { useState } from 'react';
import DropdownComponent from '../Dropdown';
import { RLabel } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface PaginationLimitProps {
  limit: string | number;
  setLimit: (limit: string | number) => void;
  setPage?: (page: number) => void;
}

export const PaginationLimit = ({ limit, setLimit }: PaginationLimitProps) => {
  const styles = useCustomStyles(loadStyles);
  const data = ['10', '20', '50'];

  return (
    <View style={styles.selectContainer}>
      <RLabel style={{ paddingBottom: 8 }}>Choose a value:</RLabel>
      <DropdownComponent
        value={limit}
        width="100%"
        accessibilityLabel="choose the number of items to be displayed"
        placeholder="Choose a value"
        onValueChange={(itemValue: string) => {
          setLimit(itemValue);
        }}
        data={data}
      />
    </View>
  );
};
const loadStyles = () => ({
  selectContainer: {
    width: '15rem',
    marginLeft: 20,
    marginBottom: 20,
    alignSelf: 'left',
  },
});
