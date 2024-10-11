import React from 'react';
import { RStack, ImageGallery, mockImages } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { ExpandableDetailsSection } from './ExpandableDetailsSection';
import ItemDetailsContent from './ItemDetailsContent';

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
  details?: Details;
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
        <ItemDetailsContent
          itemData={{
            title: mockItemData.title,
            sku: mockItemData.sku,
            seller: mockItemData.seller,
            category: mockItemData.category,
            weight: mockItemData.weight,
            unit: mockItemData.unit,
            description: mockItemData.description,
          }}
        />
      </RStack>

      {mockItemData.details && (
        <RStack style={styles.productDetailsSection}>
          <ExpandableDetailsSection details={mockItemData.details} />
        </RStack>
      )}
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
    detailsContainer: {
      flex: 1,
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
