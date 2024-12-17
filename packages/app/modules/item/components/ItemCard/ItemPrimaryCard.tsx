import React from 'react';
import { Card } from 'tamagui';
import { RStack, Image, RButton } from '@packrat/ui';
import { TouchableOpacity, View } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';
import { PlusCircle } from '@tamagui/lucide-icons';
import ItemPlaceholder from 'app/assets/item-placeholder.png';
import ItemDetailsContent from '../ItemDetailsContent';
import type { ItemCardProps } from './model';
import { useRouter } from 'app/hooks/router';

export const ItemPrimaryCard: React.FC<ItemCardProps> = ({
  item,
  onAddPackPress,
}) => {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const { xxs } = useResponsive();

  const handlePress = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push({ pathname: `/item/${item.id}`, query: { itemId: item.id } });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card elevate bordered style={styles.card(currentTheme, xxs)}>
        <RStack style={styles.content}>
          <View style={styles.imageContainer(currentTheme)}>
            <Image
              source={{ uri: item?.images?.[0]?.url }}
              defaultSource={ItemPlaceholder}
              resizeMode="contain"
              style={styles.image}
            />
            <RButton
              style={styles.addButton}
              onPress={(e) => onAddPackPress(item.id, e)}
            >
              <PlusCircle />
            </RButton>
          </View>

          <RStack style={styles.details}>
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
              isPrimaryDetails={false}
            />
          </RStack>
        </RStack>
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  card: (theme: any, xxs: boolean) => ({
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    padding: 10,
    width: '100%',
    height: xxs ? 250 : 300,
    minWidth: 250,
  }),
  content: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  imageContainer: (theme: any) => ({
    width: '40%',
    position: 'relative',
    backgroundColor: theme.colors.background,
  }),
  image: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 0,
    backgroundColor: 'transparent',
  },
  details: {
    flex: 1,
    paddingLeft: 10,
  },
};
