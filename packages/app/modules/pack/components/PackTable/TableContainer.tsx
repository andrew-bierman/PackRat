import React, { useState } from 'react';
import { RSkeleton, RButton, RText, RStack, RSeparator } from '@packrat/ui';
import { View } from 'react-native';
import { YGroup } from 'tamagui';
import {
  TotalWeightBox,
  WeightUnitDropdown,
  ErrorMessage,
} from './TableHelperComponents';
import { usePackTable } from './usePackTable';
import { ItemList } from './ItemList';
import { ItemCard } from './ItemCard';
import useResponsive from 'app/hooks/useResponsive';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useSetItemQuantity } from 'app/modules/item';
import { useDeletePackItem } from 'app/modules/pack/hooks';
import { useOfflineStore } from 'app/atoms';
import { LayoutCard } from 'app/components/LayoutCard';
import { PackSummary } from './PackSummary';

interface TableContainerProps {
  currentPack: any;
  selectedPack?: any;
  refetch?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  copy?: boolean;
  hasPermissions?: boolean;
  hideSummary?: boolean;
  forceCardLayout?: boolean;
}

export const TableContainer = ({
  currentPack,
  selectedPack,
  hasPermissions,
  hideSummary = false,
  refetch,
  setRefetch = () => {},
  copy,
  forceCardLayout = false,
}: TableContainerProps) => {
  const styles = useCustomStyles(loadStyles);
  const { isLoading, error, data, weightUnit, setWeightUnit, handleDuplicate } =
    usePackTable({
      currentPack,
      selectedPack,
      refetch,
      setRefetch,
      copy,
    });
  const { setItemQuantity } = useSetItemQuantity();
  const { deletePackItem } = useDeletePackItem();
  const { connectionStatus } = useOfflineStore();
  const responsive = useResponsive();

  const onSubmitQuantity = (itemId: string, quantity: number) => {
    setItemQuantity({
      itemId,
      packId: currentPack.id,
      quantity,
    });
  };

  const handleDeletePackItem = (itemId: string) => {
    deletePackItem({ packId: currentPack.id, itemId });
  };

  if (isLoading) return <RSkeleton />;
  if (error) return <ErrorMessage message={String(error)} />;

  return (
    <View style={styles.container}>
      {data?.length ? (
        <LayoutCard style={styles.layoutContainer}>
          <RStack>
            <RText style={styles.tableTitle}>Pack Items</RText>
            {!responsive.sm && !forceCardLayout && (
              <RStack
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <RText
                  style={{
                    fontWeight: 'bold',
                    flexBasis: '25%',
                    marginLeft: 15,
                  }}
                >
                  Name
                </RText>
                <RText
                  style={{
                    fontWeight: 'bold',
                    flexBasis: '20%',
                    textAlign: 'center',
                  }}
                >
                  Category
                </RText>
                <RText
                  style={{
                    fontWeight: 'bold',
                    flexBasis: '20%',
                    textAlign: 'center',
                  }}
                >
                  Weight
                </RText>
                <RText
                  style={{
                    fontWeight: 'bold',
                    flexBasis: '25%',
                    textAlign: 'center',
                  }}
                >
                  Quantity
                </RText>
                {connectionStatus === 'connected' && (
                  <RText style={{ fontWeight: 'bold', flexBasis: '10%' }}>
                    Actions
                  </RText>
                )}
              </RStack>
            )}

            <YGroup alignSelf="stretch" size="$8">
              {data.map((item) => (
                <YGroup.Item key={item.id}>
                  {responsive.sm || forceCardLayout ? (
                    <ItemCard
                      item={item}
                      value={item.quantity}
                      decrease={() =>
                        onSubmitQuantity(item.id, item.quantity - 1)
                      }
                      increase={() =>
                        onSubmitQuantity(item.id, item.quantity + 1)
                      }
                      setValue={(value) => onSubmitQuantity(item.id, value)}
                      submit={(value) => onSubmitQuantity(item.id, value)}
                      hasError={false}
                      handleDeleteItem={handleDeletePackItem}
                      isActionsEnabled={connectionStatus === 'connected'}
                    />
                  ) : (
                    <ItemList
                      item={item}
                      isActionsEnabled={connectionStatus === 'connected'}
                      onSubmitQuantity={onSubmitQuantity}
                      handleDeleteItem={handleDeletePackItem}
                    />
                  )}
                </YGroup.Item>
              ))}
            </YGroup>

            {copy && <RButton onPress={handleDuplicate}>Copy</RButton>}

            {!hideSummary && (
              <PackSummary
                currentPack={currentPack}
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
              />
            )}
          </RStack>
        </LayoutCard>
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
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 0,
      flex: 1,
      padding: 10,
      borderRadius: 10,
      backgroundColor: currentTheme.colors.background,
      borderColor: currentTheme.colors.cardBorderPrimary,
      borderWidth: 1,
    },
    tableTitle: {
      fontWeight: 'bold',
      fontSize: 25,
      textAlign: 'left',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 15,
      color: currentTheme.colors.text,
    },
    noItemsText: {
      fontWeight: 'bold',
      fontSize: 16,
      margin: 20,
      textAlign: 'center',
    },
  };
};
