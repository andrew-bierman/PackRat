import React from 'react';
import { RStack, ImageGallery, View, mockImages } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { ExpandableDetailsSection } from './ExpandableDetailsSection';
import ItemDetailsContent from './ItemDetailsContent';

interface ItemData {
  title: string;
  sku: string;
  seller: string;
  category: string;
  weight: number;
  unit: string;
  description: string;
  details?: {
    key1: string;
    key2: string;
    key3: string;
  };
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

export function ItemDetailsSection({ itemData }: { itemData: ItemData }) {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();

  return (
    <RStack style={styles.container}>
      <RStack style={styles.contentContainer}>
        <View style={styles.imagePlaceholder}>
          <ImageGallery images={mockImages} />
        </View>
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
    contentContainer: {
      flexDirection: 'row',
      height: '100%',
    },
    detailsContainer: {
      flex: 1,
      padding: 10,
    },
    imagePlaceholder: {
      flex: 1,
      overflow: 'hidden',
      height: 300,
      backgroundColor: currentTheme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
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
