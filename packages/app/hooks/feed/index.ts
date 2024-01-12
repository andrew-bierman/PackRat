import { usePublicFeed } from './publicFeed';
import { useUserPacks } from './../packs';
import { useUserTrips } from '../singletrips';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   getPublicPacks,
//   getPublicTrips,
//   getFavoritePacks,
// } from '../../store/feedStore';
// import {
//   changePackStatus,
//   fetchUserPacks,
//   selectAllPacks,
// } from '../../store/packsStore';
// import { fetchUserTrips, selectAllTrips } from '../../store/tripsStore';
// import { usefetchTrips } from '~/hooks/trips';
import { useRouter } from 'expo-router';
import { fuseSearch } from '../../utils/fuseSearch';
// import { fetchUserFavorites } from '../../store/favoritesStore';

export const useFeed = (
  queryString = 'Most Recent',
  ownerId = null,
  feedType = 'public',
  selectedTypes = { pack: true, trip: true },
) => {
  switch (feedType) {
    case 'public':
      return usePublicFeed(queryString, selectedTypes);
    case 'userPacks':
      return useUserPacks(ownerId, queryString);
    case 'userTrips':
      return useUserTrips(ownerId);
    default:
      return { data: null, error: null, isLoading: true };
  }
};

const URL_PATHS = {
  userPacks: '/pack/',
  favoritePacks: '/pack/',
  userTrips: '/trip/',
};

const ERROR_MESSAGES = {
  public: 'No Public Feed Data Available',
  userPacks: 'No User Packs Available',
  favoritePacks: 'No Favorite Packs Available',
  userTrips: 'No User Trips Available',
};

export const useFeedScreen = ({ feedType = 'public' }) => {
  const router = useRouter();

  const [queryString, setQueryString] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });
  const [selectedTrips, setSelectedTrips] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const ownerId = useSelector((state) => state.auth.user?._id);
  // const publicPacksData = useSelector((state) => state.feed.publicPacks);
  // const userPacksData = useSelector(selectAllPacks);
  // const publicTripsData = useSelector((state) => state.feed.publicTrips);
  // const userTripsData = useSelector(selectAllTrips);

  const { data, error, isLoading, refetch } = useFeed(
    queryString,
    ownerId,
    feedType,
    selectedTypes,
  );

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  // useEffect(() => {
  //   if (feedType === 'public') {
  //     dispatch(getPublicPacks(queryString));
  // dispatch(getPublicTrips(queryString));
  //     dispatch(fetchUserFavorites(ownerId));
  //   } else if (feedType === 'userPacks' && ownerId) {
  //     dispatch(fetchUserPacks({ ownerId, queryString }));
  //   } else if (feedType === 'userTrips' && ownerId) {
  //     dispatch(fetchUserTrips(ownerId));
  //   } else if (feedType === 'favoritePacks') {
  //     dispatch(getFavoritePacks());
  //   }
  // }, [queryString, feedType, ownerId]);

  let arrayData = data;

  // if (feedType === 'public') {
  //   if (selectedTypes?.pack) {
  //     data = [...data, ...publicPacksData];
  //   }
  //   if (selectedTypes?.trip) {
  //     data = [...data, ...publicTripsData];
  //   }
  // } else if (feedType === 'userPacks') {
  //   data = userPacksData;
  // } else if (feedType === 'userTrips') {
  //   data = userTripsData;
  // } else if (feedType === 'favoritePacks') {
  //   data = userPacksData.filter((pack) => pack.isFavorite);
  // }
  const keys = ['name', 'items.name', 'items.category'];
  const options = {
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
  };

  const results =
    feedType !== 'userTrips'
      ? fuseSearch(arrayData, searchQuery, keys, options)
      : data;
  console.log('🚀 ~ file: Feed.js:231 ~ renderData ~ results:', results);
  // Convert fuse results back into the format we want
  // if searchQuery is empty, use the original data
  arrayData = searchQuery ? results.map((result) => result.item) : data;

  const handleTogglePack = () => {
    setSelectedTypes((prevState) => ({
      ...prevState,
      pack: !prevState.pack,
    }));
  };

  const handleToggleTrip = () => {
    setSelectedTypes((prevState) => ({
      ...prevState,
      trip: !prevState.trip,
    }));
  };

  const handleSortChange = (value) => {
    setQueryString(value);
  };

  const urlPath = URL_PATHS[feedType];
  const createUrlPath = URL_PATHS[feedType] + 'create';
  const errorText = ERROR_MESSAGES[feedType];

  const handleCreateClick = () => {
    // handle create click logic
    router.push(createUrlPath);
  };
  return {
    arrayData,
    error,
    isLoading,
    refreshing,
    onRefresh,
    handleTogglePack,
    handleToggleTrip,
    handleSortChange,
    handleCreateClick,
    selectedTypes,
    searchQuery,
    setSearchQuery,
    urlPath,
    errorText,
    queryString,
    data,
  };
};
