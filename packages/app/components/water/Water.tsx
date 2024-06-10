import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RButton, RInput as OriginalRInput, RText, RStack } from '@packrat/ui';
import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useWater } from 'app/hooks/water';

interface WaterProps {
  currentPack: any;
  setWaterItem: any;
}

const RInput: any = OriginalRInput;

export default function Water({ currentPack, setWaterItem }: WaterProps) {
  const { handleWaterChange, addWater, waterWeight } = useWater(currentPack);
  const styles = useCustomStyles(loadStyles);

  return (
    <RStack style={styles.waterContainer}>
      <RStack
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
        <RText style={{ marginRight: 20 }}>Water:</RText>
        <RInput
          style={{ flex: 1, placeholderTextColor: '#000' }}
          keyboardType="numeric"
          type="number"
          placeholder="Enter water"
          value={String(currentPack?.water ?? waterWeight)}
          onChangeText={handleWaterChange}
        />
        <RText style={{ marginLeft: 20 }}>(Oz)</RText>
      </RStack>
      <RButton style={{ width: '8rem' }} onPress={addWater}>
        Add
      </RButton>
    </RStack>
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
