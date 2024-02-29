import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  RButton as Button,
  RInput as Input,
  RText as Text,
  RStack as Box,
} from '@packrat/ui';
import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useWater } from 'app/hooks/water';

interface WaterProps {
  currentPack: any;
  setWaterItem: any;
}

export default function Water({ currentPack, setWaterItem }: WaterProps) {
  const { handleWaterChange, addWater, waterWeight } = useWater(currentPack);
  const styles = useCustomStyles(loadStyles);

  return (
    <Box style={styles.waterContainer}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="water"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ marginRight: 20 }}>Water:</Text>
        <Input
          style={{ flex: 1, placeholderTextColor: '#000' }}
          keyboardType="numeric"
          type="number"
          placeholder="Enter water"
          value={String(currentPack?.water ?? waterWeight)}
          onChangeText={handleWaterChange}
        />
        <Text style={{ marginLeft: 20 }}>(Oz)</Text>
      </Box>
      <Button style={{ width: '8rem' }} onPress={addWater}>
        Add
      </Button>
    </Box>
  );
}

const loadStyles = () => ({
  waterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
    backgroundColor: '#78B7BB',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignSelf: 'center',
  },
});
