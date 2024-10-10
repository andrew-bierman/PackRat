import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RText, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from '../constants';
import useTheme from 'app/hooks/useTheme';

interface ItemData {
  title: string;
  sku: string;
  seller: string;
  category: string;
  weight: number;
  unit: string;
  description: string;
}

const ItemDetailsContent = ({ itemData }: { itemData: ItemData }) => {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();

  return (
    <RStack style={styles.container}>
      <RStack style={styles.detailsContainer}>
        <RText style={styles.title}>{itemData.title}</RText>
        <RStack style={styles.infoRow}>
          <RStack style={{ flexDirection: 'column' }}>
            <RText style={styles.categoryText}>{itemData.category}</RText>
            <RText style={styles.weightText}>
              {convertWeight(
                itemData.weight,
                SMALLEST_ITEM_UNIT,
                itemData.unit,
              )}
              {itemData.unit}
            </RText>
          </RStack>
        </RStack>
        <RStack style={styles.descriptionSection}>
          <RText>{itemData.description}</RText>
        </RStack>
        <RStack style={styles.skuSellerRow}>
          <RText style={styles.skuText}>SKU: {itemData.sku}</RText>
          <RText style={styles.sellerText}>Seller: {itemData.seller}</RText>
        </RStack>
        <RStack style={styles.buttonContainer}>
          <TouchableOpacity style={styles.GoToStoreButton}>
            <RText style={styles.buttonText}>Go to Store</RText>
          </TouchableOpacity>
        </RStack>
      </RStack>
    </RStack>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = useTheme();

  return {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: currentTheme.colors.card,
    },
    detailsContainer: {
      flex: 1,
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '400',
    },
    weightText: {
      fontSize: 20,
      fontWeight: '600',
      marginRight: 10,
    },
    descriptionSection: {
      marginBottom: 5,
    },
    skuSellerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    skuText: {
      fontSize: 14,
      fontWeight: '600',
    },
    sellerText: {
      fontSize: 14,
      fontWeight: '600',
    },
    buttonContainer: {},
    GoToStoreButton: {
      backgroundColor: currentTheme.colors.secondaryBlue,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 3,
      alignItems: 'center',
    },
    buttonText: {
      color: currentTheme.colors.text,
      fontWeight: 'bold',
      fontSize: 14,
    },
  };
};

export default ItemDetailsContent;
