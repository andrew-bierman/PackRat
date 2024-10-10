import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RText, RStack, ImageGallery, mockImages } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from '../constants';
import useTheme from 'app/hooks/useTheme';
import { ExpandableDetailsSection } from './ExpandableDetailsSection';

interface Details {
  key1: string;
  key2: string;
  key3: string;
}

interface ItemData {
  title: string;
  sku: string;
  seller: string;
  category: string;
  weight: number;
  unit: string;
  description: string;
  details: Details;
}

const mockItemData: ItemData = {
  title: 'Product Title',
  sku: 'SKU123',
  seller: 'Seller Name',
  category: 'Product Category',
  weight: 2,
  unit: 'kg',
  description: 'This is a dummy description of the item for display purposes.',
  details: {
    key1: 'Value 1',
    key2: 'Value 2',
    key3: 'Value 3',
  },
};

export function ItemDetailsSectionNative() {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();

  return (
    <RStack style={styles.container}>
      <RStack style={styles.imagePlaceholder}>
        <ImageGallery images={mockImages} />
      </RStack>
      <RStack style={styles.detailsContainer}>
        <RText style={styles.title}>{mockItemData.title}</RText>
        <RStack style={styles.infoRow}>
          <RStack style={{ flexDirection: 'column' }}>
            <RText style={styles.categoryText}>{mockItemData.category}</RText>
            <RText style={styles.weightText}>
              {convertWeight(
                mockItemData.weight,
                SMALLEST_ITEM_UNIT,
                mockItemData.unit,
              )}
              {mockItemData.unit}
            </RText>
          </RStack>
        </RStack>
        <RStack style={styles.descriptionSection}>
          <RText style={styles.descriptionText}>
            {mockItemData.description}
          </RText>
        </RStack>
        <RStack style={styles.skuSellerRow}>
          <RText style={styles.skuText}>SKU: {mockItemData.sku}</RText>
          <RText style={styles.sellerText}>Seller: {mockItemData.seller}</RText>
        </RStack>
        <RStack style={styles.buttonContainer}>
          <TouchableOpacity style={styles.GoToStoreButton}>
            <RText style={styles.buttonText}>Go to Store</RText>
          </TouchableOpacity>
        </RStack>
      </RStack>
      <RStack style={styles.productDetailsSection}>
        <ExpandableDetailsSection details={mockItemData.details} />
      </RStack>
    </RStack>
  );
}

const loadStyles = (theme: any) => {
  const { currentTheme } = useTheme();

  return {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: currentTheme.colors.card,
    },
    imagePlaceholder: {
      width: '100%',
      height: 200,
      backgroundColor: currentTheme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    placeholderText: {
      color: currentTheme.colors.text,
      fontSize: 16,
    },
    detailsContainer: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 28,
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
      fontSize: 22,
      fontWeight: '600',
      marginRight: 10,
    },
    descriptionText: {
      fontSize: 14,
    },
    skuSellerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    skuText: {
      fontSize: 16,
    },
    sellerText: {
      fontSize: 16,
    },
    GoToStoreButton: {
      backgroundColor: currentTheme.colors.secondaryBlue,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 3,
      alignItems: 'center',
    },
    buttonText: {
      color: currentTheme.colors.text,
      fontWeight: 700,
      fontSize: 16,
    },
    productDetailsSection: {
      width: '100%',
      padding: 5,
      marginTop: 20,
      backgroundColor: currentTheme.colors.background,
      borderRadius: 5,
    },
  };
};
