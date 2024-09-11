import { Card, Details, RLink, RStack, RText } from '@packrat/ui';
import React, { type FC } from 'react';
import { PackImage } from './PackImage';
import {
  FavoriteButton,
  CreatedAtLabel,
  type FeedCardProps,
} from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { DuplicateIcon } from 'app/assets/icons';
import { useItemWeightUnit } from 'app/modules/item';
import { convertWeight } from 'app/utils/convertWeight';

interface PackCardProps extends FeedCardProps<PackDetails> {}

export const PackPrimaryCard: FC<PackCardProps> = (props) => {
  const [weightUnit] = useItemWeightUnit();
  delete props.details.similarityScore;
  const packDetails = Object.entries(props.details).map(([key, value]) => ({
    key,
    label: key,
    value:
      key === 'weight'
        ? `${convertWeight(value, 'g', weightUnit)} ${weightUnit}`
        : value,
  }));

  console.log('props.isTemplate', props.isTemplate);
  console.log('props.cardType', props.cardType);

  return (
    <Card
      title={props.title}
      link={`/${props.isTemplate ? 'pack-templates' : 'pack'}/${props.id}`}
      image={<PackImage />}
      subtitle={<CreatedAtLabel date={props.createdAt} />}
      actions={
        <RStack style={{ flexDirection: 'row', gap: 12 }}>
          <FavoriteButton
            count={props.favoriteCount}
            isAuthUserFavorite={props.isUserFavorite}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.toggleFavorite();
            }}
          />
          {!props.isTemplate && (
            <>
              <RStack
                alignItems="center"
                style={{ flexDirection: 'row', gap: 8 }}
              >
                <DuplicateIcon link={`/pack/${props.id}?copy=true`} />
              </RStack>
              <RLink
                href={`/profile/${props.ownerId}`}
                style={{ textDecoration: 'none' }}
              >
                <RText style={{ marginLeft: 'auto' }}>View owner</RText>
              </RLink>
            </>
          )}
        </RStack>
      }
      content={<Details items={packDetails} />}
      type={props.cardType}
    />
  );
};
