import { useSelector, useDispatch } from 'react-redux';
import { useAddFavorite } from 'app/hooks/favorites';
import {
  // addFavorite,
  selectFavoriteById,
  selectAllFavorites,
} from 'app/store/favoritesStore';
import useTheme from '../useTheme';
import { truncateString } from 'app/utils/truncateString';
import { formatNumber } from 'app/utils/formatNumber';
import { debounce } from 'lodash';

export const useFeedCard = (props) => {
  const { _id, name, destination, total_weight, duration, favorited_by, type } =
    props;

  const user = useSelector((state) => state.auth.user);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const { addFavorite } = useAddFavorite();

  const favorites = useSelector(selectAllFavorites);
  const dispatch = useDispatch();

  const isFavorite =
    type !== 'trip' &&
    (favorited_by?.includes(user?._id) ||
      favorited_by?.some((obj) => obj?._id === user?._id && user?.id));

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

    // dispatch(addFavorite(data));
    addFavorite(data);
  };

  /**
   * Handles the removal of an item from the favorites list.
   *
   * @return {void} This function does not return a value.
   */
  //   const handleRemoveFromFavorite = () => {
  //     const favorite = favorites.find(
  //       (favorite) => favorite.pack_id === _id && favorite.user_id === user._id,
  //     );
  //     if (favorite) {
  //       dispatch(removeFavorite(favorite.id));
  //     }
  //   };

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);
  const formattedWeight = formatNumber(total_weight); // TODO convert to user preference once implemented

  const numberOfNights = duration && JSON.parse(duration).numberOfNights;

  return {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme,
    addFavorite,
    isFavorite,
    handleAddToFavorite,
    // handleRemoveFromFavorite,
    numberOfNights,
    truncatedName,
    truncatedDestination,
    formattedWeight,
    user,
  };
};

export const useFeedSearchFilter = (props) => {
  const { setSearchQuery } = props;
  const dataValues = [
    'Favorite',
    'Most Recent',
    'Lightest',
    'Heaviest',
    'Most Items',
    'Fewest Items',
    'Oldest',
  ];
  const { currentTheme } = useTheme();
  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500);
  return { currentTheme, debouncedSearch, dataValues };
};
