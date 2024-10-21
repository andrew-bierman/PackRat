import React, { useMemo } from 'react';
import { RStack, ImageGallery, View, RButton } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { ExpandableDetailsSection } from './ExpandableDetailsSection';
import { useItemPackPicker } from '../hooks/useItemPackPicker';

import ItemDetailsContent from './ItemDetailsContent';
import useResponsive from 'app/hooks/useResponsive';
import RadioButtonGroup from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup';
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

  return (
    <RStack style={styles.container}>
      <RStack style={styles.contentContainer}>
        <View style={styles.imagePlaceholder}>
          <RButton
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              padding: 0,
              backgroundColor: 'transparent',
              zIndex: 10,
            }}
            onPress={(e) => {
              onTriggerOpen(itemData.id, e);
            }}
          >
            <PlusCircle />
          </RButton>
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
      <PackPickerOverlay {...overlayProps} />
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
