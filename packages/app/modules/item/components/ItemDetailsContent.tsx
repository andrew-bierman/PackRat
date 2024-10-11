import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RText, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from '../constants';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';

interface ItemData {
  title: string;
  sku: string;
  seller: string;
  category: string;
  weight: number;
  unit: string;
  description: string;
  productUrl: string;
}

const ItemDetailsContent = ({ itemData }: { itemData: ItemData }) => {
  const styles = useCustomStyles(loadStyles);

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
        <TouchableOpacity style={styles.GoToStoreButton}>
          <RText style={styles.buttonText}>Go to Store</RText>
        </TouchableOpacity>
      </RStack>
    </RStack>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = useTheme();
  const { xxs, xs, sm } = useResponsive();

  return {
    container: {
      flex: 1,
      padding: xxs ? 0 : xs ? 8 : 10,
      backgroundColor: currentTheme.colors.card,
    },
    detailsContainer: {
      flex: 1,
      padding: xxs ? 0 : xs ? 8 : 10,
    },
    title: {
      fontSize: xxs ? 20 : xs ? 22 : sm ? 24 : 26,
      fontWeight: 'bold',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: xs ? 5 : 10,
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '400',
    },
    weightText: {
      fontSize: xxs ? 16 : xs ? 18 : 20,
      fontWeight: xxs ? '800' : xs ? '700' : '600',
      marginRight: 10,
    },
    descriptionSection: {
      height: xxs ? 80 : xs ? 90 : 100,
      marginVertical: 10,
    },
    skuSellerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: xxs ? 0 : 8,
    },
    skuText: {
      fontSize: xxs ? 12 : 14,
      fontWeight: '600',
    },
    sellerText: {
      fontSize: xxs ? 12 : 14,
      fontWeight: '600',
    },
    GoToStoreButton: {
      backgroundColor: currentTheme.colors.secondaryBlue,
      paddingVertical: xxs ? 4 : 8,
      paddingHorizontal: xxs ? 0 : 15,
      borderRadius: 3,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: currentTheme.colors.text,
      fontWeight: 'bold',
      fontSize: xxs ? 12 : 14,
    },
  };
};

export default ItemDetailsContent;
