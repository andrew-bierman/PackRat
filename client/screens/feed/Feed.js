import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Text,
  HStack,
  Stack,
  Switch,
  Button,
  Input,
  IconButton,
  Divider,
  Center,
  Flex,
} from 'native-base';
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
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return (
    <View style={styles.filterContainer}>
      <Box style={styles.searchContainer}>
        <HStack space={3}>
          <Input
            w="80%"
            variant="outline"
            placeholder={`Search ${feedType || 'Feed'}`}
            onChangeText={setSearchQuery}
          />
          <IconButton
            icon={
              <AntDesign
                name="search1"
                size={24}
                color={currentTheme.colors.cardIconColor}
              />
            }
            variant="ghost"
          />
        </HStack>
      </Box>
      <Divider my={3} />
      <Center
        space={3}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={'wrap'}
        padding={2}
        margin={2}
      >
        {feedType === 'public' && (
          <HStack space={3} alignItems="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={currentTheme.colors.textColor}
            >
              Packs
            </Text>
            <Switch
              size="lg"
              isChecked={selectedTypes.pack}
              onToggle={handleTogglePack}
            />
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={currentTheme.colors.textColor}
            >
              Trips
            </Text>
            <Switch
              size="lg"
              isChecked={selectedTypes.trip}
              onToggle={handleToggleTrip}
            />
          </HStack>
        )}
        <HStack space={3} alignItems="center">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={currentTheme.colors.textColor}
          >
            Sort By:
          </Text>
          <DropdownComponent
            value={queryString}
            data={dataValues}
            onValueChange={handleSortChange}
            placeholder="Sort By"
            style={styles.dropdown}
            width={150}
          />
        </HStack>
        {(feedType === 'userPacks' || feedType === 'userTrips') && (
          <Button onPress={handleCreateClick}>Create</Button>
        )}
      </Center>
      <Divider my={3} />
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
          {console.log({ data })}
          {feedSearchFilterComponent}
          {data?.map((item) => (
            <Card key={item._id} type={item.type} {...item} />
          ))}
        </View>
      </ScrollView>
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

  return <Box style={styles.mainContainer}>{renderData()}</Box>;
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
