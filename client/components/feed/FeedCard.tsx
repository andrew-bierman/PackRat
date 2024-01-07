import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import { TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { DuplicateIcon } from '../DuplicateIcon/index';
import { RText, RStack, RHeading } from '@packrat/ui';
import { useFeedCard } from '~/hooks/feed/feedComponent';

export default function Card({
  type,
  _id,
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
}) {
  const {
    currentTheme,
    numberOfNights,
    isFavorite,
    handleAddToFavorite,
    truncatedName,
    truncatedDestination,
    formattedWeight,
    user,
  } = useFeedCard({
    _id,
    name,
    destination,
    total_weight,
    duration,
    favorited_by,
    type,
  });

  return (
    <View style={{ alignItems: 'center', padding: '16px' }}>
      <View
        style={{
          minHeight: '150px',
          minWidth: '300px',
          marginVertical: 'auto',
          borderRadius: '15px',
          overflow: 'hidden',
          borderColor: 'lightgray',
          borderWidth: '1',
          backgroundColor: `${currentTheme.colors.card}`,
        }}
      >
        <RStack style={{ padding: '16px', gap: '50px' }}>
          <RStack style={{ gap: '10px' }}>
            <RHeading>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Link href={type === 'pack' ? '/pack/' + _id : '/trip/' + _id}>
                  <RText fontSize={18} color={currentTheme.colors.textColor}>
                    {truncatedName}
                  </RText>
                </Link>
                <RStack
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  {type === 'pack' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        // border: '1px solid #ccc',
                      }}
                    >
                      <MaterialIcons
                        name="backpack"
                        size={24}
                        color={currentTheme.colors.cardIconColor}
                      />
                      <DuplicateIcon link={`/pack/${_id}?copy=true`} />
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
              <RText
                fontSize="$1"
                color="mediumpurple"
                fontWeight="500"
                ml={-0.5}
                mt={-1}
              >
                Total Weight: {formattedWeight}
              </RText>
            )}

            {type === 'trip' && (
              <RText
                fontSize="$1"
                color="mediumpurple"
                fontWeight="500"
                ml={-0.5}
                mt={-1}
              >
                {truncatedDestination}
              </RText>
            )}
          </RStack>

          <RStack
            style={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <RStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <Link href={`/profile/${owner_id}`}>
                  <RText color={currentTheme.colors.textColor}>
                    View {owner?.username ? '@' + owner?.username : 'Owner'}
                  </RText>
                </Link>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '100px',
                  }}
                >
                  <RText fontSize="$1" color="gray" fontWeight="400" flex={1}>
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
                    <RText fontSize="$2" color={currentTheme.colors.textColor}>
                      Favorites
                    </RText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      {user?._id === owner_id ? null : (
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
                      )}

                      <RText
                        color={currentTheme.colors.textColor}
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
                    <RText fontSize="$2" color={currentTheme.colors.textColor}>
                      Nights
                    </RText>
                    <RText
                      fontSize="$2"
                      color={currentTheme.colors.textColor}
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
      </View>
    </View>
  );
}
