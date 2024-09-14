import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { FlatList, View, Platform, ActivityIndicator } from 'react-native';
import { FeedCard, FeedSearchFilter, SearchProvider } from '../components';
import { useRouter } from 'app/hooks/router';
import { fuseSearch } from 'app/utils/fuseSearch';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFeed } from 'app/modules/feed';
import { RefreshControl } from 'react-native';
import { RText } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import { disableScreen } from 'app/hoc/disableScreen';

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

interface FeedProps {
  feedType?: string;
}

const Feed = ({ feedType = 'public' }: FeedProps) => {
  const router = useRouter();
  const [queryString, setQueryString] = useState('Favorite');
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // Controls multiple fetches
  const debouncedFetchMoreTimeout = useRef(null); // To prevent rapid fetchMore triggers

  const user = useAuthUser();
  const ownerId = user?.id;
  const styles = useCustomStyles(loadStyles);

  const { data, isLoading, hasMore, fetchNextPage, refetch, isFetchingNextPage } = useFeed({
    queryString,
    ownerId,
    feedType,
    selectedTypes,
  });

  // Refresh data
  const onRefresh = () => {
    setRefreshing(true);
    refetch && refetch(); // Ensure refetch is defined
    setRefreshing(false);
  };

  // Fetch more data with debounce to prevent repeated calls
  const fetchMoreData = useCallback(async () => {
    if (!loadingMore && hasMore && !isLoading && !isFetchingNextPage) {
      setLoadingMore(true); // Prevent further calls until data is fetched
      await fetchNextPage();
    }
  }, [loadingMore, hasMore, isLoading, isFetchingNextPage, fetchNextPage]);

  // Debounced version of fetchMoreData to prevent duplicate fetches
  const handleEndReached = () => {
    if (!debouncedFetchMoreTimeout.current) {
      debouncedFetchMoreTimeout.current = setTimeout(() => {
        fetchMoreData();
        clearTimeout(debouncedFetchMoreTimeout.current);
        debouncedFetchMoreTimeout.current = null;
      }, 300); // Adjust debounce time as necessary
    }
  };

  // Trigger when items are fully rendered
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setLoadingMore(false); // Allow fetching more once items are rendered
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // Trigger when at least 50% of item is visible
  });

  // Web-specific scroll detection
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 50 && !loadingMore && hasMore) {
          fetchMoreData();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }
  }, [loadingMore, hasMore, isLoading, fetchMoreData]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!data) return [];
    const keys = ['name', 'items.name', 'items.category'];
    const options = {
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
    };
    const results = fuseSearch(data, searchQuery, keys, options);
    return searchQuery ? results.map((result) => result.item) : data;
  }, [searchQuery, data]);

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

  const handleCreateClick = () => {
    const createUrlPath = URL_PATHS[feedType] + 'create';
    router.push(createUrlPath);
  };

  return (
    <View style={styles.mainContainer}>
      <SearchProvider>
        <View style={{ flex: 1, paddingBottom: Platform.OS === 'web' ? 10 : 0 }}>
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
          <FlatList
            style={{ marginTop: 5 }}
            data={filteredData}
            horizontal={false}
            ItemSeparatorComponent={() => <View style={{ height: 12, width: '100%' }} />}
            keyExtractor={(item, index) => `${item?.id}_${item?.type}_${index}`} // Ensure unique keys
            renderItem={({ item }) => (
              <FeedCard key={item?.id} item={item} cardType="primary" feedType={item.type} />
            )}
            ListFooterComponent={() =>
              isFetchingNextPage || isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <View style={{ height: 50 }} />
              )
            }
            ListEmptyComponent={() => (
              <RText style={{ textAlign: 'center', marginTop: 20 }}>
                {ERROR_MESSAGES[feedType]}
              </RText>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={handleEndReached} // Debounced fetch next page
            onEndReachedThreshold={0.1} // Trigger earlier when close to the bottom
            initialNumToRender={6} // Render more items initially to ensure scrolling
            maxToRenderPerBatch={3} // Ensure more items are rendered in a batch to avoid stopping scroll
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged} // Trigger when items are fully rendered
            viewabilityConfig={viewabilityConfig.current} // Use viewability config for better control
          />
        </View>
      </SearchProvider>
    </View>
  );
};

const loadStyles = (theme) => ({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.currentTheme.colors.background,
    fontSize: 18,
    padding: 15,
    ...(Platform.OS !== 'web' && { paddingBottom: 15, paddingTop: 0 }),
  },
});

export default disableScreen(Feed, (props) => props.feedType === 'userTrips');
