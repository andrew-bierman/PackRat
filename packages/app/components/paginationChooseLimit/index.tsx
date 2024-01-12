import { View } from 'react-native';
import React, { useState } from 'react';
import DropdownComponent from '../Dropdown';
import { RLabel } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';

const data = ['10', '20', '50'];

export const PaginationLimit = ({ limit, setLimit, setPage }) => {
  const styles = useCustomStyles(loadStyles);

  return (
    <View style={styles.selectContainer}>
      <RLabel style={{ alignSelf: 'center', paddingBottom: 8 }}>
        Choose a value:
      </RLabel>
      <DropdownComponent
        value={limit}
        accessibilityLabel="choose the number of items to be displayed"
        width="15rem"
        placeholder="Choose a value"
        onValueChange={(itemValue) => {
          setLimit(itemValue);
          setPage(1);
        }}
        data={data}
      />
    </View>
  );
};
const loadStyles = () => ({
  selectContainer: {
    width: '15rem',
  },
});
