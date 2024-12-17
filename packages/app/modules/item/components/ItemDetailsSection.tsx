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

export function ItemDetailsSection({ itemData }: { itemData: ItemData }) {
  const styles = useCustomStyles(loadStyles);
  const { overlayProps, onTriggerOpen } = useItemPackPicker();
  const productDetails = useMemo(
    () => parseProductDetails(itemData.productDetails),
    [itemData.productDetails],
  );

  return (
    <RStack style={styles.container}>
      <RStack style={styles.contentContainer}>
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
  const { xxs } = useResponsive();

  return {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: currentTheme.colors.background,
    },
    contentContainer: {
      flexDirection: xxs ? 'column' : 'row',
    },
    imageContainer: {
      flex: 1,
      height: 400,
      backgroundColor: currentTheme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: xxs ? 0 : 10,
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
