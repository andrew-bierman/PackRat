import React, { useMemo, useState, useEffect, memo } from 'react';
import {
  FlatList,
  View,
  Platform,
  ActivityIndicator,
  type ViewProps,
} from 'react-native';
import {
  FeedCard,
  FeedList,
  FeedSearchFilter,
  SearchProvider,
} from '../components';
import { useRouter } from 'app/hooks/router';
import { fuseSearch } from 'app/utils/fuseSearch';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFeed } from 'app/modules/feed';
import { Pagination, RButton, RText } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import { type FeedType } from '../model';
import { ConnectionGate } from 'app/components/ConnectionGate';
import Layout from 'app/components/layout/Layout';

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
  feedType?: FeedType;
  listStyle?: ViewProps['style'];
}

const Feed = memo(function Feed({ feedType = 'public', listStyle }: FeedProps) {
  const router = useRouter();
  const [queryString, setQueryString] = useState('Favorite');
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const user = useAuthUser();
  const ownerId = user?.id;
  const {
    data,
    isLoading,
    refetch,
    fetchPrevPage,
    fetchNextPage,
    hasPrevPage,
    hasNextPage,
    currentPage,
    totalPages,
  } = useFeed({
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
    <Layout>
      <SearchProvider>
        <View style={{ width: '100%', backgroundColor: 'transparent' }}>
          <ConnectionGate mode="connected">
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
          </ConnectionGate>
          <FeedList
            data={data}
            style={listStyle}
            CardComponent={({ item }) => (
              <FeedCard
                key={item?.id}
                item={item}
                cardType="primary"
                feedType={item.type}
              />
            )}
            isLoading={isLoading}
            separatorHeight={12}
          />
          {totalPages > 1 ? (
            <Pagination
              isPrevBtnDisabled={!hasPrevPage}
              isNextBtnDisabled={!hasNextPage}
              onPressPrevBtn={fetchPrevPage}
              onPressNextBtn={fetchNextPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          ) : null}
        </View>
      </SearchProvider>
    </Layout>
  );
});

export default Feed;
