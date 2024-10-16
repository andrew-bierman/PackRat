import React, { useState } from 'react';
import { RSkeleton, RButton, RText, RStack, RSeparator } from '@packrat/ui'; // Added RSeparator here
import { View } from 'react-native';
import { YGroup } from 'tamagui';
import {
  TotalWeightBox,
  WeightUnitDropdown,
  ErrorMessage,
} from './TableHelperComponents';
import { usePackTable } from './usePackTable';
import { ItemList } from './ItemList';
import useResponsive from 'app/hooks/useResponsive';
import useCustomStyles from 'app/hooks/useCustomStyles';
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
  const { sm } = useResponsive();
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
        <View style={styles.layoutContainer}>
          <YGroup alignSelf="stretch" size="$8" style={styles.itemsList}>
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

          {copy && <RButton onPress={handleDuplicate}>Copy</RButton>}

          <View style={styles.summarySection}>
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
            <RSeparator style={styles.separator} />
            <TotalWeightBox
              label="Total Weight"
              weight={totalWeight}
              unit={weightUnit}
            />
            <WeightUnitDropdown
              value={weightUnit}
              onChange={(itemValue: string) => setWeightUnit(itemValue as any)}
            />
          </View>
        </View>
      ) : (
        <RText style={styles.noItemsText}>Add your First Item</RText>
      )}
    </View>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  const { sm } = useResponsive();

  return {
    container: {
      flex: 1,
      padding: 10,
      width: '100%',
    },
    layoutContainer: {
      flexDirection: sm ? 'column' : 'row',
      justifyContent: 'space-between',
    },
    itemsList: {
      flex: 2,
      marginRight: 20,
      backgroundColor: currentTheme.colors.card,
      width: '100%',
      height: '100%',
    },
    summarySection: {
      marginTop: sm ? 20 : 0,
      flex: 1,
      padding: sm ? 10 : 5,
      borderRadius: 10,
      elevation: 8,
      backgroundColor: currentTheme.colors.card,
    },
    separator: {
      marginVertical: 10,
    },
    noItemsText: {
      fontWeight: 'bold',
      fontSize: 16,
      margin: 20,
      textAlign: 'center',
    },
  };
};
