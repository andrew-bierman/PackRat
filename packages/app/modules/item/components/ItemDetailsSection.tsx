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
              title: itemData.title,
              sku: itemData.sku,
              seller: itemData.seller,
              category: itemData.category,
              weight: itemData.weight,
              unit: itemData.unit,
              description: itemData.description,
            }}
          />
        </RStack>
      </RStack>
      {itemData.details && (
        <RStack style={styles.productDetailsSection}>
          <ExpandableDetailsSection details={itemData.details} />
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
