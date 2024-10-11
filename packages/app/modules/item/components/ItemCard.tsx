import React from 'react';
import { Card, Image } from 'tamagui';
import ItemDetailsContent from './ItemDetailsContent';
import { mockImages, RStack } from '@packrat/ui';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
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
  const firstImage = mockImages[0];
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
        padding: xxs ? 4 : 10,
        height: xxs ? 300 : 350,
        width: xxs ? '100%' : '50%',
      }}
    >
      <RStack
        style={{
          flexDirection: 'row',
          height: '100%',
          width: '100%',
        }}
      >
        <View style={{ width: '40%' }}>
          <Image
            source={{ uri: firstImage }}
            resizeMode="stretch"
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <RStack style={{ flex: 1, paddingLeft: 5 }}>
          <ItemDetailsContent
            itemData={{
              title: itemData.name,
              sku: itemData.sku,
              seller: itemData.seller,
              category: itemData.category.name,
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
