import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { Platform, TouchableOpacity, View } from 'react-native';
import { DuplicateIcon } from '../DuplicateIcon/index';
import { truncateString } from '../../utils/truncateString';
import {
  RLink,
  RText as OriginalRText,
  RStack,
  RHeading,
  ContextMenu,
} from '@packrat/ui';
import { formatNumber } from 'app/utils/formatNumber';
import { useAddFavorite, useFetchUserFavorites } from 'app/hooks/favorites';
import { useAuthUser } from 'app/auth/hooks';
import { useRouter } from 'app/hooks/router';
import { useItemWeightUnit } from 'app/hooks/items';
import { convertWeight } from 'app/utils/convertWeight';
import Layout from 'app/components/layout/Layout';
const RText: any = OriginalRText;

interface CardProps {
  type: string;
  id: string;
  owner: {
    id: string;
    username: string;
  };
  name: string;
  total_weight: number;
  is_public: boolean;
  favorited_by: Array<{
    id: string;
  }>;
  favorites_count: number;
  owner_id: string | { id: String };
  destination: string;
  createdAt: string;
  owners: Array<{ any: any }>;
  duration: string;
  itemPacks?: any[];
}

interface User {
  id: string;
}

export default function Card({
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
}: CardProps) {
  console.log('CardProps:', favorited_by);
  const user = useAuthUser();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const { addFavorite } = useAddFavorite();
  const [weightUnit] = useItemWeightUnit();

  // const { data: favorites = [] } = useFetchUserFavorites(user?.id);

  const router = useRouter();

  const isFavorite =
    type !== 'trip' &&
    // (favorited_by?.includes(user?.id) ||
    favorited_by?.some((obj) => obj?.['userId'] === user?.id && user?.id); // Check if obj?.userId is defined

  /**
   * Handles adding an item to the user's favorites.
   *
   * @return {void}
   */
  const handleAddToFavorite = () => {
    if (!user) return;
    const data = {
      packId: id,
      userId: user.id,
    };

    addFavorite(data);
  };

  /**
   * Handles the removal of an item from the favorites list.
   *
   * @return {void} This function does not return a value.
   */
  // const handleRemoveFromFavorite = () => {
  //   const favorite = favorites.find(
  //     (favorite) => favorite.pack_id === id && favorite.user_id === user.id,
  //   );
  //   if (favorite) {
  //     // TODO IMPLEMENT remove favorite
  //   }
  // };

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);
  const formattedWeight = convertWeight(total_weight, 'g', weightUnit);
  // const formattedWeight = formatNumber(total_weight); // TODO convert to user preference once implemented
  const quantity =
    itemPacks?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.item?.quantity,
      0,
    ) ?? 0;
  let numberOfNights;

  if (duration) numberOfNights = JSON.parse(duration).numberOfNights;
  const calculatedWidth = Platform.OS === 'web' ? '60vw' : '60%';
  return (
    <Layout>
      <View
        style={{
          width: '100%',
          borderRadius: 15,
          borderColor: 'lightgray',
          borderWidth: 1,
          backgroundColor: `${currentTheme.colors.card}`,
        }}
      >
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <RStack style={{ padding: 16, gap: 50 }}>
              <RStack style={{ gap: 10 }}>
                <RHeading>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
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
                    <RStack
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      {type === 'pack' && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 8,
                            // border: '1px solid #ccc',
                          }}
                        >
                          <MaterialIcons
                            name="backpack"
                            size={24}
                            color={currentTheme.colors.cardIconColor}
                          />
                          <DuplicateIcon link={`/pack/${id}?copy=true`} />
                        </View>
                      )}
                      {type === 'trip' && (
                        <Entypo
                          name="location-pin"
                          size={24}
                          color={currentTheme.colors.cardIconColor}
                        />
                      )}
                    </RStack>
                  </View>
                </RHeading>

                {type === 'pack' && (
                  <RText fontSize="$1" color="mediumpurple" ml={-0.5} mt={-1}>
                    Total Weight: {formatNumber(formattedWeight)} {weightUnit}
                  </RText>
                )}
                {type === 'pack' && (
                  <RText fontSize="$1" color="mediumpurple" ml={-0.5} mt={-1}>
                    Total Quantity: {quantity}
                  </RText>
                )}

                {type === 'trip' && (
                  <RText fontSize="$1" color="mediumpurple" ml={-0.5} mt={-1}>
                    {truncatedDestination}
                  </RText>
                )}
              </RStack>

              <RStack
                style={{
                  // alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <RStack
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // width: '100%',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 8,
                    }}
                  >
                    <RLink
                      href={`/profile/${type === 'pack' ? owner_id : owner_id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <RText color={currentTheme.colors.textSecondary}>
                        View {owner?.username ? '@' + owner?.username : 'Owner'}
                      </RText>
                    </RLink>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 100,
                      }}
                    >
                      <RText fontSize="$1" color="gray" flex={1}>
                        {formatDistanceToNow(
                          new Date(
                            !Number.isNaN(new Date(createdAt).getTime())
                              ? createdAt
                              : new Date(),
                          ).getTime(),
                          {
                            addSuffix: true,
                          },
                        ) ?? 0}
                      </RText>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {type === 'pack' && (
                      <View>
                        <RText
                          fontSize="$2"
                          color={currentTheme.colors.textSecondary}
                        >
                          Favorites
                        </RText>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          {user?.id !== owner_id ? (
                            <TouchableOpacity onPress={handleAddToFavorite}>
                              <AntDesign
                                name="heart"
                                size={16}
                                color={
                                  isFavorite
                                    ? 'red'
                                    : `${currentTheme.colors.cardIconColor}`
                                }
                              />
                            </TouchableOpacity>
                          ) : null}

                          <RText
                            color={currentTheme.colors.textSecondary}
                            fontSize="$2"
                            fontWeight="400"
                          >
                            {favorites_count > 0 ? favorites_count : 0}
                          </RText>
                        </View>
                      </View>
                    )}
                    {type === 'trip' && (
                      <View>
                        <RText
                          fontSize="$2"
                          color={currentTheme.colors.tertiaryBlue}
                        >
                          Nights
                        </RText>
                        <RText
                          fontSize="$2"
                          color={currentTheme.colors.tertiaryBlue}
                          style={{
                            justifyContent: 'flex-end',
                          }}
                        >
                          {numberOfNights}
                        </RText>
                      </View>
                    )}
                  </View>
                </RStack>
              </RStack>
            </RStack>
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
      </View>
    </Layout>
  );
}
