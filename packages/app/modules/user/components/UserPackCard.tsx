import { Card, RButton, RStack, RSwitch, RText } from '@packrat/ui';
import React, { useEffect, useState, type FC } from 'react';
import { PackImage } from 'app/modules/pack/components/PackCard/PackImage';
import {
  FavoriteButton,
  useFetchUserFavorites,
  type FeedCardProps,
} from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { useEditPack } from 'app/modules/pack/hooks';
import useTheme from 'app/hooks/useTheme';
import { StarIcon } from 'lucide-react-native';
import { useUserPacks } from 'app/modules/pack/hooks';

interface PackCardProps extends FeedCardProps<PackDetails> {}

export const UserPackCard: FC<PackCardProps> = (props) => {
  const { editPack } = useEditPack();
  const [isPublic, setIsPublic] = useState(props.is_public);

  const { currentTheme } = useTheme();

  const { refetch } = useUserPacks(props.ownerId, {}, '', true);
  const { refetch: refetchFavorites } = useFetchUserFavorites(props.ownerId);

  const updateIsPublic = (value) => {
    setIsPublic(value);
    editPack(
      { id: props.id, name: props.title, is_public: value },
      {
        onSuccess: () => {
          refetch();
          refetchFavorites();
        },
      },
    );
  };

  useEffect(() => {
    setIsPublic(props.is_public);
  }, [props.is_public]);

  return (
    <Card
      title={props.title}
      link={`/pack/${props.id}`}
      image={<PackImage />}
      subtitle={
        <RStack
          style={{
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
          }}
        >
          <StarIcon size={16} color={currentTheme.colors.text} />
          <RText>
            {!isNaN(props.details.similarityScore)
              ? props.details.similarityScore
              : props.details.score}
          </RText>
        </RStack>
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
              refetch();
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
      style={{
        borderColor: isPublic
          ? currentTheme.colors.secondaryBlue
          : currentTheme.colors.background,
        borderWidth: 2,
      }}
    />
  );
};
