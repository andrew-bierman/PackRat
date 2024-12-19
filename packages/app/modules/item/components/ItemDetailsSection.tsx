import React, { useMemo } from 'react';
import { RStack, ImageGallery, View, RButton } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { ExpandableDetailsSection } from './ExpandableDetailsSection';
import { useItemPackPicker } from '../hooks/useItemPackPicker';
import ItemDetailsContent from './ItemDetailsContent';
import useResponsive from 'app/hooks/useResponsive';
import { PlusCircle } from '@tamagui/lucide-icons';
import { PackPickerOverlay } from 'app/modules/pack';

interface ItemData {
  id: string;
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

export function ItemDetailsSection({
  itemData,
  isProductScreen,
}: {
  itemData: ItemData;
  isProductScreen?: boolean;
}) {
  const styles = useCustomStyles(loadStyles);
  const { sm } = useResponsive();
  const { overlayProps, onTriggerOpen } = useItemPackPicker();
  const productDetails = useMemo(
    () => parseProductDetails(itemData.productDetails),
    [itemData.productDetails],
  );

  return (
    <RStack style={styles.container}>
      <RStack
        style={[
          styles.contentContainer,
          isProductScreen
            ? { flexDirection: sm ? 'column' : 'row', gap: 10 }
            : undefined,
        ]}
      >
        <View style={styles.imageContainer}>
          <RButton
            style={styles.iconButton}
            onPress={(e) => onTriggerOpen(itemData.id, e)}
          >
            <PlusCircle />
          </RButton>
          <ImageGallery images={itemData.images?.map(({ url }) => url) || []} />
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
              productDetails: itemData.productDetails,
            }}
            isPrimaryDetails
          />
        </RStack>
      </RStack>

      <PackPickerOverlay {...overlayProps} />
    </RStack>
  );
}

const parseProductDetails = (details?: string) => {
  try {
    return details
      ? Object.entries(JSON.parse(details.replace(/'/g, '"'))).map(
          ([key, value]) => ({
            key,
            label: key,
            value: value?.toString() || '',
          }),
        )
      : [];
  } catch (e) {
    console.error('Error parsing product details:', e);
    return [];
  }
};

const loadStyles = (theme: any) => {
  const { currentTheme } = useTheme();
  const { sm } = useResponsive();

  return {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: currentTheme.colors.background,
    },
    contentContainer: {
      alignItems: 'stretch',
    },
    imageContainer: {
      flex: 1,
      minHeight: 400,
      width: sm ? '100%' : '50%',
      backgroundColor: currentTheme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    detailsContainer: {
      flex: 1,
      padding: 10,
    },
    iconButton: {
      position: 'absolute',
      top: 4,
      right: 4,
      zIndex: 10,
      backgroundColor: 'transparent',
    },
  };
};
