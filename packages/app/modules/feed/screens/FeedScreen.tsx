import { Pagination } from '@packrat/ui';
import { ConnectionGate } from 'app/components/ConnectionGate';
import Layout from 'app/components/layout/Layout';
import { useRouter } from 'app/hooks/router';
import { useAuthUser } from 'app/modules/auth';
import { useFeed } from 'app/modules/feed';
import React, { memo, useState } from 'react';
import { View, type ViewProps } from 'react-native';
import { FeedCard, FeedList, FeedSearchFilter } from '../components';
import { type FeedType } from '../model';
import { searchQueryAtom } from 'app/atoms/feed';
import { useAtom } from 'jotai';

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
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const [refreshing, setRefreshing] = useState(false);

  const user = useAuthUser();
  const ownerId = user?.id;
  const {
    data,
    isLoading,
    isError,
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

  const onRefresh = () => {
    setRefreshing(true);
    refetch && refetch();
    setRefreshing(false);
  };

  const handleTypeChange = (value: string) => {
    setSelectedTypes({
      pack: value === 'Packs',
      trip: value === 'Trips',
    });
  };

  const handleSortChange = (value: string) => {
    setQueryString(value);
  };

  const handleCreateClick = () => {
    const createUrlPath = URL_PATHS[feedType] + 'create';
    router.push(createUrlPath);
  };

  return (
    <Layout>
      <View style={{ width: '100%', backgroundColor: 'transparent' }}>
        <ConnectionGate mode="connected">
          <FeedSearchFilter
            feedType={feedType}
            handleSortChange={handleSortChange}
            handleTypeChange={handleTypeChange}
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
          isError={isError}
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
    </Layout>
  );
});

export default Feed;
