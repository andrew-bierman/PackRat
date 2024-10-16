import React, { useState } from 'react';
import { RSkeleton, RButton, RText } from '@packrat/ui';
import { View } from 'react-native';
import { YGroup } from 'tamagui';
import {
  TotalWeightBox,
  WeightUnitDropdown,
  ErrorMessage,
} from './TableHelperComponents';
import { usePackTable } from './usePackTable';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './packtable.style';
import { ItemList } from './ItemList';

interface TableContainerProps {
  currentPack: any;
  selectedPack?: any;
  refetch?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  copy?: boolean;
  hasPermissions?: boolean;
}

export const TableContainer = ({
  currentPack,
  selectedPack,
  hasPermissions,
  refetch,
  setRefetch = () => {},
  copy,
}: TableContainerProps) => {
  const styles = useCustomStyles(loadStyles);
  const {
    isLoading,
    error,
    data,
    totalBaseWeight,
    totalFoodWeight,
    totalWaterWeight,
    totalWeight,
    weightUnit,
    setWeightUnit,
    handleDuplicate,
  } = usePackTable({
    currentPack,
    selectedPack,
    refetch,
    setRefetch,
    copy,
  });

  const [quantities, setQuantities] = useState(
    data.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}),
  );

  const handleIncrease = (itemId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  const handleDecrease = (itemId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(1, prevQuantities[itemId] - 1),
    }));
  };

  const handleQuantityChange = (itemId: string, newQuantity: string) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  if (isLoading) return <RSkeleton />;
  if (error) return <ErrorMessage message={String(error)} />;

  return (
    <View style={styles.container}>
      {data?.length ? (
        <>
          <YGroup alignSelf="stretch" bordered width="100%" size="$8">
            {data.map((item) => (
              <YGroup.Item key={item.id}>
                <ItemList
                  item={item}
                  quantities={quantities}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                  handleQuantityChange={handleQuantityChange}
                />
              </YGroup.Item>
            ))}
          </YGroup>

          {copy && (
            <RButton
              style={{
                width: 300,
                marginHorizontal: 'auto',
                marginTop: 10,
              }}
              onPress={handleDuplicate}
            >
              Copy
            </RButton>
          )}

          <TotalWeightBox
            label="Base Weight"
            weight={totalBaseWeight}
            unit={weightUnit}
          />
          <TotalWeightBox
            label="Water + Food Weight"
            weight={totalWaterWeight + totalFoodWeight}
            unit={weightUnit}
          />
          <TotalWeightBox
            label="Total Weight"
            weight={totalWeight}
            unit={weightUnit}
          />
          <WeightUnitDropdown
            value={weightUnit}
            onChange={(itemValue: string) => setWeightUnit(itemValue as any)}
          />
        </>
      ) : (
        <RText style={styles.noItemsText}>Add your First Item</RText>
      )}
    </View>
  );
};
