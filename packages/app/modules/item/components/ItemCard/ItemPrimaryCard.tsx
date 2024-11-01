import React, { useState } from 'react';
import { Card } from 'tamagui';
import ItemDetailsContent from '../ItemDetailsContent';
import { RStack, Image, RButton } from '@packrat/ui';
import { TouchableOpacity, View, Platform } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import { useRouter } from 'app/hooks/router';
import useResponsive from 'app/hooks/useResponsive';
import { PlusCircle } from '@tamagui/lucide-icons';
import ItemPlaceholder from 'app/assets/item-placeholder.png';
import type { ItemCardProps } from './model';

export const ItemPrimaryCard: React.FC<ItemCardProps> = ({
  item,
  onAddPackPress,
}) => {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const { xxs } = useResponsive();

  const handlePress = (e) => {
    e.stopPropagation();
    router.push({
      pathname: `/item/${item.id}`,
      query: { itemId: item.id },
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
                  uri: item?.images?.[0]?.url,
                }}
                defaultSource={ItemPlaceholder}
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
                  onAddPackPress(item.id, e);
                }}
              >
                <PlusCircle />
              </RButton>
            </View>

            <RStack style={{ flex: 1, paddingLeft: 10 }}>
              <ItemDetailsContent
                itemData={{
                  title: item.name,
                  sku: item.sku,
                  seller: item.seller,
                  category: item?.category?.name,
                  productUrl: item.productUrl,
                  weight: item.weight,
                  unit: item.unit,
                  description: item.description,
                }}
              />
            </RStack>
          </RStack>
        </Card>
      </TouchableOpacity>
    </>
  );
};
