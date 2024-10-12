import React, { useMemo } from 'react';
import { RStack, ImageGallery, View, mockImages } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { ExpandableDetailsSection } from './ExpandableDetailsSection';
import ItemDetailsContent from './ItemDetailsContent';
import useResponsive from 'app/hooks/useResponsive';

interface ItemData {
  name: string;
  sku: string;
  seller: string;
  category: { name: string };
  weight: number;
  unit: string;
  description: string;
  images: Array<{ url: string }>;
  productDetails?: string;
  productUrl: string;
}

export function ItemDetailsSection({ itemData }: { itemData: ItemData }) {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();
  const productDetails = useMemo(() => {
    try {
      const parsedDetails = JSON.parse(
        itemData?.productDetails?.replace?.(/'/g, '"'),
      );
      return parsedDetails;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, [itemData?.productDetails]);
  console.log(itemData);

  return (
    <RStack style={styles.container}>
      <RStack style={styles.contentContainer}>
        <View style={styles.imagePlaceholder}>
          <ImageGallery
            images={itemData?.images?.map?.(({ url }) => url) || []}
          />
        </View>
        <RStack style={styles.detailsContainer}>
          <ItemDetailsContent
            itemData={{
              title: itemData.name,
              sku: itemData.sku,
              seller: itemData.seller,
              category: itemData.category?.name,
              weight: itemData.weight,
              unit: itemData.unit,
              description: itemData.description,
              productUrl: itemData.productUrl,
            }}
          />
        </RStack>
      </RStack>
      {productDetails && (
        <RStack style={styles.productDetailsSection}>
          <ExpandableDetailsSection details={productDetails} />
        </RStack>
      )}
    </RStack>
  );
}

const loadStyles = (theme: any) => {
  const { currentTheme } = useTheme();
  const { xxs } = useResponsive();

  return {
    container: {
      flex: 1,
      padding: 10,
      flexDirection: 'column',
      backgroundColor: currentTheme.colors.background,
    },
    contentContainer: {
      flexDirection: xxs ? 'column' : 'row',
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
