import React, { useMemo, useState, useEffect, memo } from 'react';
import { FlatList, View, Platform, ActivityIndicator } from 'react-native';
import { FeedCard, FeedSearchFilter, SearchProvider } from '../components';
import { useRouter } from 'app/hooks/router';
import { fuseSearch } from 'app/utils/fuseSearch';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFeed } from 'app/modules/feed';
import { RefreshControl } from 'react-native';
import { RButton, RText } from '@packrat/ui';
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

const Feed = memo(function Feed({ feedType = 'public' }: FeedProps) {
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
  const { data, isLoading, fetchNextPage, refetch, nextPage } = useFeed({
    queryString,
    ownerId,
    feedType,
    selectedTypes,
    searchQuery,
  });

  // Refresh data
  const onRefresh = () => {
    setRefreshing(true);
    refetch && refetch(); // Ensure refetch is defined
    setRefreshing(false);
  };

  // const filteredData = useMemo(() => {
  //   if (!data) return [];
  //   const keys = ['name', 'items.name', 'items.category'];
  //   const options = {
  //     threshold: 0.4,
  //     location: 0,
  //     distance: 100,
  //     maxPatternLength: 32,
  //     minMatchCharLength: 1,
  //   };
  //   const results = fuseSearch(data, searchQuery, keys, options);
  //   return searchQuery ? results.map((result) => result.item) : data;
  // }, [searchQuery, data]);

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
        <View
          style={{ flex: 1, paddingBottom: Platform.OS === 'web' ? 10 : 0 }}
        >
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
            data={data}
            horizontal={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: 12, width: '100%' }} />
            )}
            keyExtractor={(item, index) => `${item?.id}_${item?.type}_${index}`} // Ensure unique keys
            renderItem={({ item }) => (
              <FeedCard
                key={item?.id}
                item={item}
                cardType="primary"
                feedType={item.type}
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
                {ERROR_MESSAGES[feedType]}
              </RText>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            // onEndReached={fetchNextPage} // Trigger next page fetch
            onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
          />
          {nextPage ? (
            <RButton onPress={fetchNextPage}>Load more</RButton>
          ) : null}
        </View>
      </SearchProvider>
    </View>
  );
});

const loadStyles = (theme) => ({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.currentTheme.colors.background,
    fontSize: 18,
    padding: 15,
    ...(Platform.OS !== 'web' && { paddingBottom: 15, paddingTop: 0 }),
  },
});

export default Feed;
