import { Card, Details, RLink, RStack, RText } from '@packrat/ui';
import React, { type FC } from 'react';
import { useItemWeightUnit } from 'app/modules/item';
import { convertWeight } from 'app/utils/convertWeight';
import { roundNumber } from 'app/utils';
import { PackImage } from 'app/modules/pack';

export default function PackTemplatePrimaryCard(props) {
  const [weightUnit] = useItemWeightUnit();

  return (
    <Card
      title={props.name}
      link={`/pack-templates/${props.id}`}
      image={<PackImage />}
      subtitle={<RText>{props.description}</RText>}
      content={
        <Details
          items={Object.entries({
            weight: props.total_weight,
            quantity: props.quantity,
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
      type={props.cardType}
    />
  );
}
