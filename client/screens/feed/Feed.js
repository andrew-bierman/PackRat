import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'native-base';
import {
  RButton,
  RInput,
  RScrollView,
  RSeperator,
  RStack,
  RText,
  RXStack,
} from '@packrat/ui';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
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
  searchQuery,
  setSearchQuery,
  handleCreateClick,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return (
    <RStack
      backgroundColor={currentTheme.colors.card}
      padding={15}
      fontSize={18}
      width={'100%'}
      borderRadius={10}
    >
      <RStack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginBottom={10}
        padding={10}
        borderRadius={5}
      >
        <RXStack space={3}>
          <RInput
            w="80%"
            variant="outline"
            placeholder={`Search ${feedType || 'Feed'}`}
            onChangeText={setSearchQuery}
          />
          <RStack height={'100%'} marginLeft={'$4'} alignSelf="center">
            <AntDesign
              name="search1"
              size={24}
              color={currentTheme.colors.cardIconColor}
            />
          </RStack>
        </RXStack>
      </RStack>
      <RSeperator marginVertical={15} />
      <RStack
        space={3}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={'wrap'}
        padding={2}
        margin={2}
      >
        {feedType === 'public' && (
          <RXStack space={15} alignItems="center">
            <RText
              fontSize="lg"
              fontWeight="bold"
              color={currentTheme.colors.textColor}
            >
              Packs
            </RText>
            <Switch
              size="lg"
              isChecked={selectedTypes.pack}
              onToggle={handleTogglePack}
            />
            <RText
              fontSize="lg"
              fontWeight="bold"
              color={currentTheme.colors.textColor}
            >
              Trips
            </RText>
            <Switch
              size="lg"
              isChecked={selectedTypes.trip}
              onToggle={handleToggleTrip}
            />
          </RXStack>
        )}
        <RXStack space={15} alignItems="center">
          <RText
            fontSize="lg"
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
            width={150}
          />
        </RXStack>
        {(feedType === 'userPacks' || feedType === 'userTrips') && (
          <RButton onPress={handleCreateClick}>Create</RButton>
        )}
      </RStack>
      <RSeperator marginVertical={15} />
    </RStack>
  );
};

const Feed = ({ feedType = 'public' }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

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
    let data = [];

    if (feedType === 'public') {
      if (selectedTypes?.pack) {
        data = [...data, ...publicPacksData];
      }
      if (selectedTypes?.trip) {
        data = [...data, ...publicTripsData];
      }
    } else if (feedType === 'userPacks') {
      data = userPacksData;
    } else if (feedType === 'userTrips') {
      data = userTripsData;
    } else if (feedType === 'favoritePacks') {
      data = userPacksData.filter((pack) => pack.isFavorite);
    }

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

    const results =
      feedType !== 'userTrips'
        ? fuseSearch(data, searchQuery, keys, options)
        : data;

    // Convert fuse results back into the format we want
    // if searchQuery is empty, use the original data
    data = searchQuery ? results.map((result) => result.item) : data;

    const feedSearchFilterComponent = (
      <FeedSearchFilter
        feedType={feedType}
        handleSortChange={handleSortChange}
        handleTogglePack={handleTogglePack}
        handleToggleTrip={handleToggleTrip}
        selectedTypes={selectedTypes}
        queryString={queryString}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleCreateClick={handleCreateClick}
      />
    );
    return Platform.OS === 'web' ? (
      <RScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, paddingBottom: 10 }}
      >
        <RStack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
        >
          {console.log({ data })}
          {feedSearchFilterComponent}
          {data?.map((item) => (
            <Card
              key={`${item._id} + ${item.type}`}
              type={item.type}
              {...item}
            />
          ))}
        </RStack>
      </RScrollView>
    ) : (
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <FlatList
          data={data}
          numColumns={1}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card key={item._id} type={item.type} {...item} />
          )}
          ListHeaderComponent={() => feedSearchFilterComponent}
          ListEmptyComponent={() => <RText>{ERROR_MESSAGES[feedType]}</RText>}
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

  return (
    <RStack
      flex={1}
      backgroundColor={currentTheme.colors.background}
      fontSize={18}
      padding={15}
    >
      {renderData()}
    </RStack>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {};
};

export default Feed;
