import React from 'react';
import { Card, Image } from 'tamagui';
import ItemDetailsContent from './ItemDetailsContent';
import { RStack, mockImages } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import Link from '@packrat/ui/src/RLink';

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

  return (
    <RStack
      style={{
        height: 250,
        width: '50%',
      }}
    >
      <Link to={`/item/${itemData.id}`} style={{ textDecoration: 'none' }}>
        <Card
          elevate
          bordered
          style={{
            borderRadius: 10,
            backgroundColor: currentTheme.colors.card,
            padding: 10,
          }}
        >
          <RStack style={{ flexDirection: 'row', height: '100%' }}>
            <Image
              source={{ uri: firstImage }}
              width="100%"
              height={200}
              resizeMode="stretch"
              style={{ flex: 1 }}
            />

            <RStack style={{ flex: 1 }}>
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
      </Link>
    </RStack>
  );
};

export default ItemCard;
