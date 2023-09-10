import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
// import useAddToFavorite from "../../hooks/useAddToFavorites";
// import { useAuth } from "../../auth/provider";
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavorite,
  selectFavoriteById,
  selectAllFavorites,
} from '../../store/favoritesStore';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { DuplicateIcon } from '../DuplicateIcon/index';
import { truncateString } from '../../utils/truncateString';

import {
  Box,
  Heading,
  AspectRatio,
  Text,
  Center,
  HStack,
  Stack,
  Button,
} from 'native-base';
import { formatNumber } from '~/utils/formatNumber';

// import { useAuth } from "../../auth/provider";

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
  const user = useSelector((state) => state.auth.user);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const favorites = useSelector(selectAllFavorites);
  const dispatch = useDispatch();

  const isFavorite =
    !type === 'trip'
      ? favorited_by.includes(user._id) ||
        favorited_by.forEach((obj) => obj._id === user._id)
      : null;

  /**
   * Handles adding an item to the user's favorites.
   *
   * @return {void}
   */
  const handleAddToFavorite = () => {
    const data = {
      packId: _id,
      userId: user._id,
    };

    dispatch(addFavorite(data));
  };

  /**
   * Handles the removal of an item from the favorites list.
   *
   * @return {void} This function does not return a value.
   */
  const handleRemoveFromFavorite = () => {
    const favorite = favorites.find(
      (favorite) => favorite.pack_id === _id && favorite.user_id === user._id,
    );
    if (favorite) {
      dispatch(removeFavorite(favorite.id));
    }
  };
  // const { addToFavorite } = useAddToFavorite();

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);
  const formattedWeight = formatNumber(total_weight); // TODO convert to user preference once implemented

  let numberOfNights;

  if (duration) numberOfNights = JSON.parse(duration).numberOfNights;

  return (
    <Box alignItems="center" padding="4">
      <Box
        minH="125"
        minW="80"
        maxW="lg" // add this
        mx="auto" // add this
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: `${currentTheme.colors.border}`,
          backgroundColor: `${currentTheme.colors.card}`,
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: `${currentTheme.colors.card}`,
        }}
      >
        <Stack p="4" space={10}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              <Box
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Link href={type === 'pack' ? '/pack/' + _id : '/trip/' + _id}>
                  <Text color={currentTheme.colors.textColor}>
                    {truncatedName}
                  </Text>
                </Link>
                <HStack alignItems="center" justifyContent="center" space={2}>
                  {type === 'pack' && (
                    <Box
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 5,
                        // border: '1px solid #ccc',
                      }}
                    >
                      <MaterialIcons
                        name="backpack"
                        size={24}
                        color={currentTheme.colors.cardIconColor}
                      />
                      <DuplicateIcon link={`/pack/${_id}?copy=true`} />
                    </Box>
                  )}
                  {type === 'trip' && (
                    <Entypo
                      name="location-pin"
                      size={24}
                      color={currentTheme.colors.cardIconColor}
                    />
                  )}
                </HStack>
              </Box>
            </Heading>

            {type === 'pack' && (
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                Total Weight: {formattedWeight}
              </Text>
            )}

            {type === 'trip' && (
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                {truncatedDestination}
              </Text>
            )}
          </Stack>

          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <Link href={`/profile/${owner_id}`}>
                  <Text color={currentTheme.colors.textColor}>
                    View {owner?.username ? '@' + owner?.username : 'Owner'}
                  </Text>
                </Link>
                <Box
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                    fontWeight="400"
                    flex={1}
                  >
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
                  </Text>
                </Box>
              </Box>

              <Box
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {type === 'pack' && (
                  <Box>
                    <Text color={currentTheme.colors.textColor}>Favorites</Text>
                    <Box
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
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

                      <Text
                        color={currentTheme.colors.textColor}
                        _dark={{
                          color: currentTheme.colors.textColor,
                        }}
                        fontWeight="400"
                      >
                        {favorites_count > 0 ? favorites_count : 0}
                      </Text>
                    </Box>
                  </Box>
                )}
                {type === 'trip' && (
                  <Box>
                    <Text color={currentTheme.colors.textColor}>Nights</Text>
                    <Text
                      color={currentTheme.colors.textColor}
                      _dark={{
                        color: currentTheme.colors.textColor,
                      }}
                      style={{
                        justifyContent: 'flex-end',
                      }}
                    >
                      {numberOfNights}
                    </Text>
                  </Box>
                )}
              </Box>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
