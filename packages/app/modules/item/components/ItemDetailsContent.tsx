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
        <RText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {itemData.title}
        </RText>
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
          <RText
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.descriptionText}
          >
            {itemData.description}
          </RText>
        </RStack>
        <RStack style={styles.skuSellerRow}>
          <RText numberOfLines={1} ellipsizeMode="tail" style={styles.skuText}>
            SKU: {itemData.sku}
          </RText>
          <RText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.sellerText}
          >
            Seller: {itemData.seller}
          </RText>
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
    },
    detailsContainer: {
      flex: 1,
      padding: xxs ? 0 : xs ? 8 : 10,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: xxs ? 16 : xs ? 16 : sm ? 18 : 20,
      fontWeight: 'bold',
      maxHeight: 60,
      marginVertical: xxs ? 0 : 5,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: xxs ? 0 : xs ? 3 : 5,
      flexShrink: 1,
    },
    categoryText: {
      fontSize: xxs ? 12 : xs ? 12 : sm ? 14 : 16,
      fontWeight: '400',
    },
    weightText: {
      fontSize: xxs ? 16 : xs ? 16 : 18,
      fontWeight: xxs ? '800' : xs ? '700' : '600',
    },
    descriptionSection: {
      maxHeight: 60,
      marginVertical: xxs ? 0 : 5,
      padding: xxs ? 0 : 5,
    },
    descriptionText: {
      fontSize: xxs ? 12 : xs ? 12 : sm ? 14 : 16,
    },
    skuSellerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: xxs ? 0 : 5,
      height: 30,
    },
    skuText: {
      fontSize: xxs ? 9 : 10,
      fontWeight: '600',
      flexShrink: 1,
      maxWidth: '40%',
      paddingTop: xxs ? 9 : 0,
    },
    sellerText: {
      fontSize: xxs ? 9 : 10,
      fontWeight: '600',
      flexGrow: 0,
      flexShrink: 0,
    },
    GoToStoreButton: {
      backgroundColor: currentTheme.colors.secondaryBlue,
      paddingVertical: xxs ? 4 : 6,
      paddingHorizontal: xxs ? 0 : 10,
      borderRadius: 3,
      alignItems: 'center',
      marginTop: 5,
    },
    buttonText: {
      color: currentTheme.colors.text,
      fontWeight: 'bold',
      fontSize: xxs ? 10 : 12,
    },
  };
};

export default ItemDetailsContent;
