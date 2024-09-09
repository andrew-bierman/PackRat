import React, { useMemo, useState, useEffect } from 'react';
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
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const user = useAuthUser();
  const ownerId = user?.id;
  const styles = useCustomStyles(loadStyles);

  // Fetch feed data using the useFeed hook
  const { data, isLoading, hasMore, fetchNextPage } = useFeed({
    queryString,
    ownerId,
    feedType,
    selectedTypes,
  });

  // Refresh data
  const onRefresh = () => {
    setRefreshing(true);
    // Optional: Add a manual refetch to reload data
    setRefreshing(false);
  };

  // Fetch more data when reaching the end
  const fetchMoreData = async () => {
    if (!isFetchingNextPage && hasMore && !isLoading) {
      setIsFetchingNextPage(true);
      await fetchNextPage(); // Call to fetch the next page
      setIsFetchingNextPage(false);
    }
  };

  // Web-specific scroll detection
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 50 && !isFetchingNextPage && hasMore) {
          fetchMoreData();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }
  }, [isFetchingNextPage, hasMore, isLoading]);

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

  return (
    <View style={styles.mainContainer}>
      <SearchProvider>
        <View style={{ flex: 1, paddingBottom: Platform.OS === 'web' ? 10 : 0 }}>
          <FeedSearchFilter
            feedType={feedType}
            handleSortChange={setQueryString}
            handleTogglePack={() => setSelectedTypes((prev) => ({ ...prev, pack: !prev.pack }))}
            handleToggleTrip={() => setSelectedTypes((prev) => ({ ...prev, trip: !prev.trip }))}
            selectedTypes={selectedTypes}
            queryString={queryString}
            setSearchQuery={setSearchQuery}
          />
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => `${item?.id}_${item?.type}_${index}`} // Ensure unique keys
            renderItem={({ item }) => (
              <FeedCard
                key={`${item?.id}_${item?.type}`}
                type={item?.type}
                favorited_by={item?.userFavoritePacks}
                {...item}
              />
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
                No data available
              </RText>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={fetchMoreData} // Trigger next page fetch
            onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
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
