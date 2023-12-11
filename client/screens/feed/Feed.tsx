import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RIconButton,
  RSwitch,
  RText,
  RStack,
  RInput,
  RSeparator,
  RButton,
} from '@packrat/ui';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import Card from '../../components/feed/FeedCard';
import DropdownComponent from '../../components/Dropdown';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import {
  getPublicPacks,
  getPublicTrips,
  getFavoritePacks,
} from '../../store/feedStore';
import {
  changePackStatus,
  fetchUserPacks,
  selectAllPacks,
} from '../../store/packsStore';
import { fetchUserTrips, selectAllTrips } from '../../store/tripsStore';
import { useRouter } from 'expo-router';
import { fuseSearch } from '../../utils/fuseSearch';
import { fetchUserFavorites } from '../../store/favoritesStore';
import useCustomStyles from '~/hooks/useCustomStyles';
import debounce from 'lodash/debounce';

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

const dataValues = [
  'Favorite',
  'Most Recent',
  'Lightest',
  'Heaviest',
  'Most Items',
  'Fewest Items',
  'Oldest',
];

const FeedSearchFilter = ({
  feedType,
  handleSortChange,
  handleTogglePack,
  handleToggleTrip,
  selectedTypes,
  queryString,
  setSearchQuery,
  handleCreateClick,
}) => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const inputRef = useRef(null);
  const onHandleChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (setSearchQuery) setSearchQuery(value);
    },
    [setSearchQuery],
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(onHandleChange, 200),
    [onHandleChange],
  );

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <View style={styles.filterContainer}>
      <View style={styles.searchContainer}>
        <RStack
          space={3}
          style={{ flexDirection: 'row', justifyContent: 'center' }}
        >
          <RInput
            size="$30"
            placeholder={`Search ${feedType || 'Feed'}`}
            onChange={debouncedChangeHandler}
            ref={inputRef}
          />
          <RIconButton
            backgroundColor="transparent"
            icon={
              <AntDesign
                name="search1"
                size={24}
                color={currentTheme.colors.cardIconColor}
              />
            }
          />
        </RStack>
      </View>
      <RSeparator />
      <RStack
        flex={1}
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        margin={2}
      >
        {feedType === 'public' && (
          <RStack
            style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}
          >
            <RText
              fontSize={18}
              fontWeight="bold"
              color={currentTheme.colors.textColor}
            >
              Packs
            </RText>
            <RSwitch
              size="$1.5"
              checked={selectedTypes.pack}
              onCheckedChange={handleTogglePack}
            />
            <RText
              fontSize={18}
              fontWeight="bold"
              color={currentTheme.colors.textColor}
            >
              Trips
            </RText>
            <RSwitch
              size="$1.5"
              checked={selectedTypes.trip}
              onCheckedChange={handleToggleTrip}
            />
          </RStack>
        )}
        <RStack
          style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}
        >
          <RText
            fontSize={17}
            fontWeight="bold"
            color={currentTheme.colors.textColor}
          >
            Sort By:
          </RText>
          <DropdownComponent
            value={queryString}
            data={dataValues}
            onValueChange={handleSortChange}
            placeholder="Sort By"
            style={styles.dropdown}
            width={150}
          />
        </RStack>
        {(feedType === 'userPacks' || feedType === 'userTrips') && (
          <RButton onPress={handleCreateClick}>Create</RButton>
        )}
      </RStack>
      <RSeparator style={{ margin: '10px 0' }} />
    </View>
  );
};

const Feed = ({ feedType = 'public' }) => {
  const router = useRouter();

  const [queryString, setQueryString] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const ownerId = useSelector((state) => state.auth.user?._id);
  const publicPacksData = useSelector((state) => state.feed.publicPacks);
  const userPacksData = useSelector(selectAllPacks);
  const publicTripsData = useSelector((state) => state.feed.publicTrips);
  const userTripsData = useSelector(selectAllTrips);

  const styles = useCustomStyles(loadStyles);

  useEffect(() => {
    if (feedType === 'public') {
      dispatch(getPublicPacks(queryString));
      dispatch(getPublicTrips(queryString));
      dispatch(fetchUserFavorites(ownerId));
    } else if (feedType === 'userPacks' && ownerId) {
      dispatch(fetchUserPacks({ ownerId, queryString }));
    } else if (feedType === 'userTrips' && ownerId) {
      dispatch(fetchUserTrips(ownerId));
    } else if (feedType === 'favoritePacks') {
      dispatch(getFavoritePacks());
    }
  }, [queryString, feedType, ownerId]);

  /**
   * Renders the data for the feed based on the feed type and search query.
   *
   * @return {ReactNode} The rendered feed data.
   */
  const renderData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      if (feedType === 'public') {
        if (selectedTypes?.pack) {
          setData([...data, ...publicPacksData]);
        }
        if (selectedTypes?.trip) {
          setData([...data, ...publicTripsData]);
        }
      } else if (feedType === 'userPacks') {
        setData(userPacksData);
      } else if (feedType === 'userTrips') {
        setData(userTripsData);
      } else if (feedType === 'favoritePacks') {
        setData(userPacksData.filter((pack) => pack.isFavorite));
      }
    }, [feedType, userPacksData, selectedTypes, publicTripsData]);

    // Fuse search
    const keys = ['name', 'items.name', 'items.category'];
    const options = {
      // your options
      threshold: 0.42,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
    };

    // Convert fuse results back into the format we want
    // if searchQuery is empty, use the original data

    const latestData = useMemo(() => {
      if (!searchQuery || feedType === 'userTrips') {
        return data;
      }
      const results = fuseSearch(data, searchQuery, keys, options);
      return results.map((result) => result.item);
    }, [data, searchQuery]);

    const feedSearchFilterComponent = (
      <FeedSearchFilter
        feedType={feedType}
        handleSortChange={handleSortChange}
        handleTogglePack={handleTogglePack}
        handleToggleTrip={handleToggleTrip}
        selectedTypes={selectedTypes}
        queryString={queryString}
        setSearchQuery={setSearchQuery}
        handleCreateClick={handleCreateClick}
      />
    );
    return Platform.OS === 'web' ? (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, paddingBottom: 10 }}
      >
        <View style={styles.cardContainer}>
          {feedSearchFilterComponent}
          {latestData?.map((item) => <Card key={item._id} item={item} />)}
        </View>
      </ScrollView>
    ) : (
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <FlatList
          data={latestData}
          numColumns={1}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card key={item._id} type={item.type} {...item} />
          )}
          ListHeaderComponent={() => feedSearchFilterComponent}
          ListEmptyComponent={() => <Text>{ERROR_MESSAGES[feedType]}</Text>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

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

  return <View style={styles.mainContainer}>{renderData()}</View>;
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      fontSize: 18,
      padding: 15,
    },
    filterContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: 15,
      fontSize: 18,
      width: '100%',
      borderRadius: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  };
};

export default Feed;
