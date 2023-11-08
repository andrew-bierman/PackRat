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
import { formatNumber } from '~/utils/formatNumber';
import { RHeader, RStack, RText, RXStack } from '@packrat/ui';

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
    <RStack margin={'$4'} alignItems="center">
      <RStack
        minHeight={'150px'}
        minWidth={'350px'}
        maxWidth={'400px'} // add this
        marginVertical={'auto'} // add this
        borderRadius={'$2'}
        overflow="hidden"
        borderColor={'grey'}
        borderWidth={'0.5px'}
        backgroundColor={currentTheme.colors.card}
      >
        <RStack p="$4" space={40}>
          <RStack space={10}>
            <RStack>
              <RStack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Link href={type === 'pack' ? '/pack/' + _id : '/trip/' + _id}>
                  <RHeader.H2 color={currentTheme.colors.textColor}>
                    {truncatedName}
                  </RHeader.H2>
                </Link>
                <RStack alignItems="center" justifyContent="center" space={2}>
                  {type === 'pack' && (
                    <RStack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <MaterialIcons
                        name="backpack"
                        size={24}
                        color={currentTheme.colors.cardIconColor}
                      />
                      <DuplicateIcon link={`/pack/${_id}?copy=true`} />
                    </RStack>
                  )}
                  {type === 'trip' && (
                    <Entypo
                      name="location-pin"
                      size={24}
                      color={currentTheme.colors.cardIconColor}
                    />
                  )}
                </RStack>
              </RStack>
            </RStack>

            {type === 'pack' && (
              <RText
                fontSize={'$1'}
                color={'purple'}
                fontWeight={'500'}
                ml="-0.5"
                mt="-1"
              >
                Total Weight: {formattedWeight}
              </RText>
            )}

            {type === 'trip' && (
              <RText
                fontSize={'$1'}
                color={'purple'}
                fontWeight={'500'}
                ml="-0.5"
                mt="-1"
              >
                {truncatedDestination}
              </RText>
            )}
          </RStack>

          <RStack alignItems="center" space={4} justifyContent="space-between">
            <RXStack
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <RStack
                flexDirection="column"
                alignItems="flex-start"
                space={'$1'}
              >
                <Link href={`/profile/${owner_id}`}>
                  <RText color={currentTheme.colors.textColor}>
                    View {owner?.username ? '@' + owner?.username : 'Owner'}
                  </RText>
                </Link>
                <RStack flexDirection alignItems="center" space={'$2'}>
                  <RText
                    color="grey"
                    fontWeight={'100'}
                    flex={1}
                    fontSize={'$1'}
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
                  </RText>
                </RStack>
              </RStack>

              <RStack flexDirection="column" alignItems="center" space={'$2'}>
                {type === 'pack' && (
                  <RStack>
                    <RText
                      color={currentTheme.colors.textColor}
                      fontSize={'$2'}
                    >
                      Favorites
                    </RText>
                    <RStack
                      flexDirection="row"
                      alignItems="center"
                      space={'$2'}
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
                        fontWeight={'100'}
                        fontSize={'$1'}
                      >
                        {favorites_count > 0 ? favorites_count : 0}
                      </RText>
                    </RStack>
                  </RStack>
                )}
                {type === 'trip' && (
                  <RStack>
                    <RText
                      color={currentTheme.colors.textColor}
                      fontSize={'$1'}
                    >
                      Nights
                    </RText>
                    <RText
                      color={currentTheme.colors.textColor}
                      fontSize={'$1'}
                      justifyContent="flex-end"
                    >
                      {numberOfNights}
                    </RText>
                  </RStack>
                )}
              </RStack>
            </RXStack>
          </RStack>
        </RStack>
      </RStack>
    </RStack>
  );
}
