import { Card, Details, RText } from '@packrat/ui';
import React, { FC } from 'react';
import { useItemWeightUnit } from 'app/modules/item';
import { convertWeight } from 'app/utils/convertWeight';
import { roundNumber } from 'app/utils';
import { PackImage } from 'app/modules/pack';
import { RouterOutput } from 'app/trpc';

type CardType = 'primary' | 'secondary';
type PackTemplateWithExtras = RouterOutput['getPackTemplate'] & {
  totalWeight?: number;
  quantity?: number;
};

export const PackTemplatePrimaryCard: FC<PackTemplateWithExtras> = (props) => {
  const [weightUnit] = useItemWeightUnit();

  return (
    <Card
      title={props.name ?? 'Untitled'}
      link={`/pack-templates/${props.id ?? ''}`}
      image={<PackImage />}
      subtitle={<RText>{props.description ?? ''}</RText>}
      content={
        <Details
          items={Object.entries({
            weight: props.totalWeight ?? 0,
            quantity: props.quantity ?? 0,
          })
            .filter(([key]) => key !== 'similarityScore')
            .map(([key, value]) => ({
              key,
              label: key,
              value:
                key === 'weight'
                  ? `${roundNumber(convertWeight(value, 'kg', weightUnit))} ${weightUnit}`
                  : value,
            }))}
        />
      }
      type={(props.type as CardType) ?? 'primary'}
    />
  );
};
