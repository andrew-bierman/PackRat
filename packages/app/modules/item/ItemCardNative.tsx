import React from 'react';
import { Card, Image } from 'tamagui';
import ItemDetailsContent from './components/ItemDetailsContent';
import { mockImages } from '@packrat/ui';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import { useRouter } from 'app/hooks/router';

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

interface ItemCardNativeProps {
  itemData: Item;
}

const ItemCardNative = ({ itemData }: ItemCardNativeProps) => {
  const { currentTheme } = useTheme();
  const firstImage = mockImages[0];
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: `/item/${itemData.id}`,
      query: { itemId: itemData.id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: firstImage }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>

        <View style={styles.detailsContainer}>
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
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
  },
  imageContainer: {
    width: '40%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    width: '60%',
  },
});

export default ItemCardNative;
