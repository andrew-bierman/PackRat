import React, { useRef, useMemo, useState } from 'react';
import { View, FlatList, Platform, Dimensions, ActivityIndicator  } from 'react-native';
import { FeedCard, FeedSearchFilter } from 'app/modules/feed';
import { fuseSearch } from 'app/utils/fuseSearch';
import { BaseDialog, BaseModal, RButton } from '@packrat/ui';
import { useUserPacks } from 'app/modules/pack';
import { useFetchUserFavorites } from 'app/modules/feed';
import { user } from 'server/src/db/schema';
// import BottomSheet from '@gorhom/bottom-sheet';

const windowHeight = Dimensions.get('window').height;

interface DataItem {
  _id: string;
  type: string;
}

interface DataListProps {
  data: DataItem[];
  userId?: string;
  type?: string;
}

export const UserDataList = ({ data: resource, userId, type }: DataListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryString, setQueryString] = useState('Favorite');
  const keys = ['name', 'items.name', 'items.category'];
  const options = {
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
  };

  const data = type === "packs"? useUserPacks(
    userId,
    { searchTerm: searchQuery },
    type,
    true,
  ) : useUserPacks(userId, { searchTerm: searchQuery }, type, true);
  

  // ref for bottom sheet
  const bottomSheetRef = useRef(null);

  // variables for bottom sheet behavior
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <>
      {Platform.OS == 'web' ? (
        <BaseModal
          title="See all"
          trigger="See all"
          footerButtons={[
            {
              label: 'Cancel',
              color: '#B22222',
              onClick: (_, closeModal) => closeModal(),
            },
          ]}
          footerComponent={undefined}
        >
          <View
            style={{ width: '100vw',
              paddingBottom: 10,
              maxWidth: 992,
              height: windowHeight * 0.8,
              flexDirection: 'column', } as any}
          >
            <FeedSearchFilter
              isSortHidden={true}
              queryString={queryString}
              setSearchQuery={setSearchQuery}
            />
            <View style={{ flex: 1 }}>
              <FlatList
                data={data.data}
                horizontal={false}
                keyExtractor={(item) => item?.id}
                ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
                renderItem={({ item }) => (
                  <FeedCard
                    key={item?._id}
                    item={item}
                    cardType="primary"
                    feedType={item.type}
                  />
                )}
                showsVerticalScrollIndicator={true}
                maxToRenderPerBatch={2}
              />
            </View>
              {data.isLoading && <ActivityIndicator size="small" color="#0000ff" />}
              {data.nextPage && !data.isLoading ? (
                <RButton onPress={data.fetchNextPage} style={{marginTop: 4}}>Load more</RButton>
              ) : null}
          </View>
        </BaseModal>
      ) : (
        <View style={{ width: '30%', alignSelf: 'center' }}>
          <BaseDialog
            title="See all"
            trigger="See all"
            footerButtons={[
              {
                label: 'Cancel',
                color: '#B22222',
                onClick: (_, closeModal) => closeModal(),
              },
            ]}
            footerComponent={undefined}
          >
            <FeedSearchFilter
              isSortHidden={true}
              queryString={queryString}
              setSearchQuery={setSearchQuery}
            />

            <FlatList
              data={data.data}
              horizontal={false}
              keyExtractor={(item) => item?._id}
              ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
              renderItem={({ item }) => (
                <FeedCard
                  key={item?._id}
                  item={item}
                  cardType="primary"
                  feedType={item.type}
                />
              )}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={2}
            />
          </BaseDialog>
        </View>
      )}
    </>
  );
};
