import React, { useState } from 'react';
import { FlatList, View, Platform, ActivityIndicator } from 'react-native';
import { FeedCard, FeedSearchFilter, SearchProvider } from '../components';
import { useRouter } from 'app/hooks/router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { RefreshControl } from 'react-native';
import { RText, RButton } from '@packrat/ui'; 
import { useFeedData } from '../hooks/useFeedData';  
import { useFilteredData } from '../hooks/useFilteredData';  
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
  
  const styles = useCustomStyles(loadStyles);

  const { 
    data, 
    isLoading, 
    hasMore, 
    fetchNextPage, 
    refreshing, 
    onRefresh, 
    isFetchingNextPage 
  } = useFeedData({ queryString, feedType, selectedTypes, searchQuery });

  const filteredData = useFilteredData(data, searchQuery);

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
            showsVerticalScrollIndicator={false}
          />
          {hasMore && !isFetchingNextPage ? (
            <RButton onPress={fetchNextPage} style={{ marginTop: 10 }}>
              Load more
            </RButton>
          ) : null}
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
