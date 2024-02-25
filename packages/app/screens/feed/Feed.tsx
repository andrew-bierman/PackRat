import React, { useState } from 'react';
import { FlatList, View, Platform } from 'react-native';
import Card from '../../components/feed/FeedCard';
import { usefetchTrips } from 'app/hooks/trips';
import { useRouter } from 'app/hooks/router';
import { fuseSearch } from '../../utils/fuseSearch';
import useCustomStyles from 'app/hooks/useCustomStyles';
import FeedSearchFilter from 'app/components/feed/FeedSearchFilter';
import { useFeed } from 'app/hooks/feed';
import { RefreshControl } from 'react-native';
import { RText } from '@packrat/ui';
import { useAuthUser } from 'app/auth/hooks';

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

interface FeedItem {
  _id: string;
  type: string;
}

interface SelectedTypes {
  pack: boolean;
  trip: boolean;
}

interface FeedProps {
  feedType?: string;
}

const Feed = ({ feedType = 'public' }: FeedProps) => {
  const router = useRouter();

  const [queryString, setQueryString] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });
  const [selectedTrips, setSelectedTrips] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const ownerId = user?._id;

  const styles = useCustomStyles(loadStyles);
  const { data, error, isLoading, refetch } = useFeed(
    queryString,
    ownerId,
    feedType,
    selectedTypes,
  );
  const user = useAuthUser();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
      setRefreshing(false);
    }, 2000);
  }, []);

  /**
   * Renders the data for the feed based on the feed type and search query.
   *
   * @return {ReactNode} The rendered feed data.
   */
  const renderData = () => {
    let arrayData = data;

    // Fuse search
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
    console.log(
      '🚀 ../.. file: Feed.js:231 ../.. renderData ../.. results:',
      results,
    );

    // Convert fuse results back into the format we want
    // if searchQuery is empty, use the original data
    arrayData = searchQuery ? results.map((result) => result.item) : data;

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
    // return Platform.OS === 'web' ? (
    //   <RScrollView
    //     showsHorizontalScrollIndicator={false}
    //     contentContainerStyle={{ flex: 1, paddingBottom: 10 }}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    //   >
    //     <View style={styles.cardContainer}>
    //       {/* {console.log({ data })} */}
    //       {feedSearchFilterComponent}
    //       {data?.map((item) => (
    //         <Card key={item?._id} type={item?.type} {...item} />
    //       ))}
    //     </View>
    //   </RScrollView>
    // ) : (
    return (
      <View style={{ flex: 1, paddingBottom: Platform.OS === 'web' ? 10 : 0 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          horizontal={false}
          keyExtractor={(item) => item?._id + item?.type}
          renderItem={({ item }) => (
            <Card key={item?._id} type={item?.type} {...item} />
          )}
          ListHeaderComponent={() => feedSearchFilterComponent}
          ListFooterComponent={() => <View style={{ height: 50 }} />}
          ListEmptyComponent={() => (
            <RText style={{ textAlign: 'center', marginTop: 20 }}>
              {ERROR_MESSAGES[feedType]}
            </RText>
          )}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={2}
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
      ...(Platform.OS !== "web" && {paddingVertical: 0})
    },
    filterContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: 15,
      fontSize: 18,
      width: '100%',
      borderRadius: 10,
      marginTop:20
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
