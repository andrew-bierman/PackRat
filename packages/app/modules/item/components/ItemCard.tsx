import React from 'react';
import { Card } from 'tamagui';
import ItemDetailsContent from './ItemDetailsContent';
import { RStack, Image, RButton } from '@packrat/ui';
import { TouchableOpacity, View, Platform } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import { useRouter } from 'app/hooks/router';
import useResponsive from 'app/hooks/useResponsive';
import { PlusCircle } from '@tamagui/lucide-icons';

interface Item {
  id: string;
  name: string;
  category: {
    name: string;
  };
  sku: string;
  seller: string;
  weight: number;
  unit: string;
  description: string;
  productUrl?: string;
  images?: Array<{ url }>;
}

interface ItemCardProps {
  itemData: Item;
  onAddPackPress: (itemId: string, e: any) => void;
}

const ItemCard = ({ itemData, onAddPackPress }: ItemCardProps) => {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const { xxs } = useResponsive();

  const handlePress = (e) => {
    e.stopPropagation();
    router.push({
      pathname: `/item/${itemData.id}`,
      query: { itemId: itemData.id },
    });
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
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
                position: 'relative',
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
              <RButton
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  padding: 0,
                  backgroundColor: 'transparent',
                }}
                onPress={(e) => {
                  onAddPackPress(itemData.id, e);
                }}
              >
                <PlusCircle />
              </RButton>
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
      </TouchableOpacity>
    </>
  );
};

export default ItemCard;
