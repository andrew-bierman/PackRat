import React, { type FC } from 'react';
import { type FeedItem, type FeedResource } from 'app/modules/feed/model';
import { feedItemPackCardConverter, feedItemTripCardConverter } from './utils';
import { PackCard } from 'app/modules/pack';
import { type CardType } from '@packrat/ui';
import { useAddFavorite } from 'app/modules/feed';
import { useAuthUser } from 'app/modules/auth';
import { TripCard } from 'app/modules/trip';

const convertersByType = {
  pack: feedItemPackCardConverter,
  trip: feedItemTripCardConverter,
};

const cardComponentsByType = {
  pack: PackCard,
  trip: TripCard,
};

interface FeedCardProps {
  feedType: FeedResource;
  cardType: CardType;
  item: FeedItem;
}

export const FeedCard: FC<FeedCardProps> = ({ item, cardType, feedType }) => {
  const { addFavorite } = useAddFavorite();
  const user = useAuthUser();
  const cardProps =
    typeof convertersByType[feedType] === 'function'
      ? convertersByType[feedType](item, user?.id)
      : null;
  const handleAddToFavorite = () => {
    if (!user) return;
    const data = {
      packId: item.id,
      userId: user.id,
    };

    addFavorite(data);
  };

  if (!cardProps) {
    return null;
  }

  const CardComponent = cardComponentsByType[feedType];

  return (
    <CardComponent
      {...cardProps}
      cardType={cardType}
      toggleFavorite={handleAddToFavorite}
    />
  );
};

/*
export function FeedCardOld({
  type,
  id,
  owner,
  name,
  total_weight,
  is_public,
  favorited_by,
  favorites_count,
  owner_id,
  destination,
  createdAt,
  owners,
  duration,
  itemPacks,
}: FeedCardProps) {
  console.log('CardProps:', favorited_by);
  const user = useAuthUser();
  const { currentTheme } = useTheme();

  const { addFavorite } = useAddFavorite();
  const [weightUnit] = useItemWeightUnit();

  const router = useRouter();

  const isFavorite =
    type !== 'trip' &&
    favorited_by?.some((obj) => obj?.['userId'] === user?.id && user?.id);

  const handleAddToFavorite = () => {
    if (!user) return;
    const data = {
      packId: id,
      userId: user.id,
    };
    addFavorite(data);
  };

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);
  const formattedWeight = convertWeight(total_weight, 'g', weightUnit);
  const quantity =
    itemPacks?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.item?.quantity,
      0,
    ) ?? 0;
  let numberOfNights;

  if (duration) numberOfNights = JSON.parse(duration).numberOfNights;

  return (
    <Layout>
      <XStack flexWrap="wrap" space="$4" padding="$4" style={{ width: '100%' }}>
        <Card
          elevate
          size="$4"
          backgroundColor={currentTheme.colors.card}
          borderWidth={0} // Remove border
          padding="$4"
          width="100%"
          height={300}
        >
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <YStack space="$4">
                <Card.Header>
                  <H2>
                    <RLink
                      href={type === 'pack' ? '/pack/' + id : '/trip/' + id}
                      style={{ textDecoration: 'none' }}
                    >
                      <RText
                        fontSize={18}
                        color={currentTheme.colors.tertiaryBlue}
                      >
                        {truncatedName}
                      </RText>
                    </RLink>
                  </H2>
                  <XStack space="$2" alignItems="center">
                    {type === 'pack' && (
                      <XStack alignItems="center" space="$2">
                        <MaterialIcons
                          name="backpack"
                          size={24}
                          color={currentTheme.colors.cardIconColor}
                        />
                        <DuplicateIcon link={`/pack/${id}?copy=true`} />
                      </XStack>
                    )}
                    {type === 'trip' && (
                      <Entypo
                        name="location-pin"
                        size={24}
                        color={currentTheme.colors.cardIconColor}
                      />
                    )}
                  </XStack>
                </Card.Header>
                {type === 'pack' && (
                  <>
                    <Paragraph theme="alt2">
                      Total Weight: {formatNumber(formattedWeight)} {weightUnit}
                    </Paragraph>
                    <Paragraph theme="alt2">
                      Total Quantity: {quantity}
                    </Paragraph>
                  </>
                )}
                {type === 'trip' && (
                  <Paragraph theme="alt2">{truncatedDestination}</Paragraph>
                )}
                <Card.Footer>
                  <YStack flex={1} justifyContent="flex-end">
                    <XStack
                      justifyContent="space-between"
                      alignItems="center"
                      flexDirection="row"
                    >
                      <YStack>
                        <RLink
                          href={`/profile/${owner_id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <RText
                            color={currentTheme.colors.text}
                            style={{ marginRight: 8 }}
                          >
                            View{' '}
                            {owner?.username ? '@' + owner?.username : 'Owner'}
                          </RText>
                        </RLink>
                        <Paragraph theme="alt2">
                          {formatDistanceToNow(new Date(createdAt), {
                            addSuffix: true,
                          })}
                        </Paragraph>
                      </YStack>
                      {type === 'pack' && (
                        <XStack alignItems="center" space="$2">
                          <TouchableOpacity onPress={handleAddToFavorite}>
                            <AntDesign
                              name="heart"
                              size={16}
                              color={
                                isFavorite
                                  ? 'red'
                                  : currentTheme.colors.cardIconColor
                              }
                            />
                          </TouchableOpacity>
                          <RText fontSize="$2" color={currentTheme.colors.text}>
                            {favorites_count}
                          </RText>
                        </XStack>
                      )}
                      {type === 'trip' && (
                        <YStack alignItems="center" space="$2">
                          <RText
                            fontSize="$2"
                            color={currentTheme.colors.tertiaryBlue}
                          >
                            Nights
                          </RText>
                          <RText
                            fontSize="$2"
                            color={currentTheme.colors.tertiaryBlue}
                          >
                            {numberOfNights}
                          </RText>
                        </YStack>
                      )}
                    </XStack>
                  </YStack>
                </Card.Footer>
              </YStack>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item
                textValue={`View ${type}`}
                key="view"
                onSelect={() => {
                  router.push(type === 'pack' ? '/pack/' + id : '/trip/' + id);
                }}
              >
                <ContextMenu.ItemTitle>View {type}</ContextMenu.ItemTitle>
              </ContextMenu.Item>
              <ContextMenu.Item
                textValue={`View owner`}
                key="owner"
                onSelect={() => {
                  router.push(`/profile/${owner_id}`);
                }}
              >
                <ContextMenu.ItemTitle>View Owner</ContextMenu.ItemTitle>
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </Card>
      </XStack>
    </Layout>
  );
}
*/
