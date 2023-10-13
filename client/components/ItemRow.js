import { Box, Container, Text } from 'native-base';
import Checkbox from 'expo-checkbox';

import { useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import useCustomStyles from '~/hooks/useCustomStyles';

export const ItemRow = ({ packName }) => {
  const [isChecked, setChecked] = useState(false);
  const styles = useCustomStyles(loadStyles);
  return (
    <Container style={styles.mainContainer}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
      />
      <Text
        style={{
          flex: 1,
          // textDecoration: isChecked ? "line-through" : "",
          color: isChecked ? '#e2e8f0' : 'black',
        }}
      >
        {packName}
      </Text>
      <Box style={styles.icons}>
        <FontAwesome name="dot-circle-o" size={24} color="black" />
        <FontAwesome name="pencil" size={24} color="black" />
        <FontAwesome name="trash" size={24} color="black" />
      </Box>
    </Container>
  );
};

const loadStyles = () => ({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  },

  icons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    cursor: 'pointer',
  },

  checkbox: {
    margin: 8,
    cursor: 'pointer',
  },
});
