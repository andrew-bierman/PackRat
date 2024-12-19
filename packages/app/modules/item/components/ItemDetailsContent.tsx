import React, { useMemo } from 'react';
import { RText, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from '../constants';
import { ExpandableDetailsSection } from './ExpandableDetailsSection';
import ItemPrimaryDetailsSection from './ItemPrimaryDetailsSection';
import RPrimaryButton from 'app/components/RPrimaryButton';
import { openExternalLink } from 'app/utils';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';

interface ItemData {
  title: string;
  sku: string;
  seller: string;
  category: string;
  weight: number;
  unit: string;
  description: string;
  productUrl: string;
  productDetails?: string;
}

interface ItemDetailsContentProps {
  itemData: ItemData;
  isPrimaryDetails?: boolean;
}

const ItemDetailsContent: React.FC<ItemDetailsContentProps> = ({
  itemData,
  isPrimaryDetails = false,
}) => {
  const styles = useCustomStyles(loadStyles);
  const { sm } = useResponsive();
  const { currentTheme } = useTheme();

  const productDetails = useMemo(
    () => parseProductDetails(itemData.productDetails),
    [itemData.productDetails],
  );

  const renderPrimaryDetails = () => (
    <>
      <RStack
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <RText numberOfLines={2} style={styles.title}>
          {itemData.title}
        </RText>
        <RText
          style={{
            marginLeft: 10,
            backgroundColor: currentTheme.colors.cardBorderPrimary,
            borderRadius: 15,
            paddingLeft: 10,
            paddingRight: 10,
            width: 'auto',
            fontSize: 12,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          {itemData.category}
        </RText>
      </RStack>
      <ItemPrimaryDetailsSection
        weight={itemData.weight}
        unit={itemData.unit}
        sku={itemData.sku}
        seller={itemData.seller}
      />
      <ExpandableDetailsSection
        title="Description"
        data={itemData.description}
      />
      <ExpandableDetailsSection title="Product Details" data={productDetails} />
    </>
  );

  const renderDefaultInfo = () => (
    <>
      <RText
        numberOfLines={2}
        style={{ fontSize: sm ? 18 : 24, fontWeight: 'bold' }}
      >
        {itemData.title}
      </RText>
      <RText style={{ fontSize: sm ? 12 : 14, maxHeight: sm ? 20 : 30 }}>
        {itemData.category}
      </RText>
      <RText
        style={{
          fontSize: sm ? 12 : 14,
          maxHeight: sm ? 20 : 30,
          fontWeight: 'bold',
        }}
      >
        {convertWeight(itemData.weight, SMALLEST_ITEM_UNIT, itemData.unit)}
        {itemData.unit}
      </RText>
      <RText style={{ fontSize: sm ? 10 : 12, maxHeight: sm ? 18 : 30 }}>
        SKU: {itemData.sku}
      </RText>
      <RText style={{ fontSize: sm ? 10 : 12, maxHeight: sm ? 18 : 30 }}>
        Seller: {itemData.seller}
      </RText>
      <RText
        numberOfLines={2}
        style={{ fontSize: sm ? 12 : 14, maxHeight: sm ? 50 : 60, flex: 1 }}
      >
        {itemData.description}
      </RText>
    </>
  );

  return (
    <RStack style={styles.container}>
      {isPrimaryDetails ? renderPrimaryDetails() : renderDefaultInfo()}
      <RPrimaryButton
        label="Go to Store"
        style={{ marginTop: 'auto' }}
        onPress={() => openExternalLink(itemData.productUrl)}
      />
    </RStack>
  );
};

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
  } catch {
    return [];
  }
};

const loadStyles = (theme: any) => ({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  infoText: { fontSize: 12, marginVertical: 2 },
  descriptionText: { fontSize: 12, marginVertical: 5 },
});

export default ItemDetailsContent;
