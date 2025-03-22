import { Card, Image, RText } from '@packrat/ui';
import React, { type FC } from 'react';
import type { ItemCardProps } from './model';
import ItemPlaceholder from 'app/assets/item-placeholder.png';
import { convertWeight } from 'app/utils/convertWeight';
import { type WeightUnit } from 'app/utils/convertWeight';

export const ItemSecondaryCard: FC<ItemCardProps> = ({ item }) => {
  return (
    <Card
      title={item.name}
      link={`/item/${item.id}`}
      image={
        <Image
          source={{
            uri: item?.images?.[0]?.url,
          }}
          defaultSource={ItemPlaceholder as any}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      }
      subtitle={`${convertWeight(item.weight, 'g', item.unit as WeightUnit)}
          ${item.unit}`}
      actions={undefined}
      type="secondary"
    />
  );
};
