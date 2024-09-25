import {
  Card,
  Details,
  RButton,
  RLink,
  RStack,
  RSwitch,
  RText,
} from '@packrat/ui';
import React, { useState, type FC } from 'react';
import { PackImage } from 'app/modules/pack/components/PackCard/PackImage';
import {
  FavoriteButton,
  CreatedAtLabel,
  type FeedCardProps,
} from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { DuplicateIcon } from 'app/assets/icons';
import { useItemWeightUnit } from 'app/modules/item';
import { convertWeight } from 'app/utils/convertWeight';
import { roundNumber } from 'app/utils';
import { useEditPack } from 'app/modules/pack/hooks';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useTheme from 'app/hooks/useTheme';

interface PackCardProps extends FeedCardProps<PackDetails> {}

export const UserPackCard: FC<PackCardProps> = (props) => {
  const { editPack, isLoading, isError } = useEditPack();
  const [isPublic, setIsPublic] = useState(props.is_public);
  const updateIsPublic = (value) => {
    setIsPublic(value);
    editPack({ id: props.id, name: props.title, is_public: value });
  };
  const { currentTheme } = useTheme();

  return (
    <Card
      title={props.title}
      link={`/pack/${props.id}`}
      image={<PackImage />}
      subtitle={
        <Details
          items={[
            {
              key: 'score',
              label: 'Score',
              value: props.details.score,
            },
          ]}
        />
      }
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
          <RButton
            style={{
              backgroundColor: currentTheme.colors.background,
              borderRadius: 20,
              height: 20,
              width: 30,
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <RSwitch
              checked={isPublic}
              onCheckedChange={updateIsPublic}
              size="$1.5"
            />
          </RButton>
        </RStack>
      }
      type={props.cardType}
    />
  );
};
