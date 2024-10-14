import React from 'react';
import { Card } from 'tamagui';
import ItemDetailsContent from './ItemDetailsContent';
import { RStack, Image } from '@packrat/ui';
import { TouchableOpacity, View, Platform } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import { useRouter } from 'app/hooks/router';
import RLink from '@packrat/ui/src/RLink';
import useResponsive from 'app/hooks/useResponsive';

interface Item {
  id: number;
  name: string;
  category: {
    name: string;
  };
  sku: string;
  seller: string;
  weight: number;
  unit: string;
  description: string;
}

interface ItemCardProps {
  itemData: Item;
}

const ItemCard = ({ itemData }: ItemCardProps) => {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const { xxs } = useResponsive();

  const handlePress = () => {
    router.push({
      pathname: `/item/${itemData.id}`,
      query: { itemId: itemData.id },
    });
  };

  const cardContent = (
    <Card
      elevate
      bordered
      style={{
        borderRadius: 10,
        backgroundColor: currentTheme.colors.card,
        padding: 10,
        width: '100%',
        height: xxs ? 250 : 300,
        minWidth: 250,
      }}
    >
      <RStack
        style={{
          flexDirection: 'row',
          height: '100%',
          width: '100%',
        }}
      >
        <View
          style={{
            width: '40%',
            backgroundColor: currentTheme.colors.background,
          }}
        >
          <Image
            source={{
              uri: itemData?.images?.[0]?.url,
            }}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        <RStack style={{ flex: 1, paddingLeft: 10 }}>
          <ItemDetailsContent
            itemData={{
              title: itemData.name,
              sku: itemData.sku,
              seller: itemData.seller,
              category: itemData.category.name,
              productUrl: itemData.productUrl,
              weight: itemData.weight,
              unit: itemData.unit,
              description: itemData.description,
            }}
          />
        </RStack>
      </RStack>
    </Card>
  );

  return (
    <>
      {Platform.OS === 'web' ? (
        <RLink to={`/item/${itemData.id}`} style={{ textDecoration: 'none' }}>
          {cardContent}
        </RLink>
      ) : (
        <TouchableOpacity onPress={handlePress}>{cardContent}</TouchableOpacity>
      )}
    </>
  );
};

export default ItemCard;
