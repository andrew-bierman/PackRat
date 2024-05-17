import type { FC, ReactElement } from 'react';
import { Image, View, Text } from 'tamagui';
import { useMemo } from 'react';

import { MasonryList } from './components/MasonryList';
import type { Product } from './data/products';
import { useData } from './data/products';
import { LinearGradient } from 'tamagui/linear-gradient';
import { useWindowDimensions } from 'tamagui';

const ProductItem: FC<{ item: Product }> = ({ item }) => {
  const heightFactor = useMemo(() => Math.random() < 0.5, []);

  return (
    <View flexDirection="column" key={item.id} mb="$6" flex={1} gap="$3">
      <View
        flexDirection="column"
        borderRadius="$10"
        shadowColor="$shadowColor"
        shadowRadius={5}
        overflow="hidden"
      >
        <Image
          source={{ uri: item.image }}
          height={heightFactor ? 200 : 350}
          alignSelf="stretch"
          resizeMode="cover"
        />
        <View position="absolute" top={0} left={0} right={0}>
          <LinearGradient
            fullscreen
            start={[0, 0]}
            end={[0, 1]}
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
          />
          <Text
            color="#fff"
            textAlign="center"
            padding="$3"
            paddingBottom="$10"
            fontSize="$2"
            fontWeight="600"
            lineHeight="$2"
            zIndex={2}
          >
            {item.name}
          </Text>
        </View>
      </View>
      <View flexDirection="column" gap="$2">
        <Text fontSize="$3" lineHeight="$2" theme="alt1">
          {item.desc}
        </Text>
        <View gap="$1">
          <Text color="$color11" theme="green" fontSize="$6" fontWeight="600">
            ${item.price}
          </Text>
          <Text textDecorationLine="line-through" theme="alt1" fontSize="$2">
            ${item.price + 10}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const MasonryListExample = () => {
  const { data } = useData();
  const { width: deviceWidth } = useWindowDimensions();
  const numberOfColumns = Math.max(Math.round(deviceWidth / 300), 1);

  const renderItem = ({
    item,
    i,
  }: {
    item: (typeof data)[0];
    i: number;
  }): ReactElement => {
    return <ProductItem item={item} />;
  };

  return (
    <View
      flex={1}
      flexDirection="column"
      width="100%"
      $group-window-gtXs={{
        paddingHorizontal: 24,
        paddingVertical: 48,
        height: 700,
      }}
    >
      <MasonryList
        keyExtractor={(item): string => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          flex: 1,
          alignSelf: 'stretch',
        }}
        gap="$4"
        key={numberOfColumns}
        numColumns={numberOfColumns}
        data={data}
        //@ts-ignore
        renderItem={renderItem}
      />
    </View>
  );
};

MasonryListExample.fileName = 'MasonryListExample';
