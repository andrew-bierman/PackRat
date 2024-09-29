import React, { useRef, useMemo, useState } from 'react';
import { View, FlatList, Platform, Dimensions, ActivityIndicator  } from 'react-native';
import { FeedCard, FeedSearchFilter } from 'app/modules/feed';
import { fuseSearch } from 'app/utils/fuseSearch';
import { BaseDialog, BaseModal, RButton } from '@packrat/ui';
import { type PreviewResourceStateWithData } from 'app/hooks/common';

interface DataListProps {
  resource: PreviewResourceStateWithData;
}

const windowHeight = Dimensions.get('window').height;

export const UserDataList = ({ resource }: DataListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {Platform.OS == 'web' ? (
        <BaseModal
          title="See all"
          trigger="See all"
          isOpen={resource.isSeeAllModalOpen}
          onOpen={() => resource.setIsSeeAllModalOpen(true)}
          onClose={() => resource.setIsSeeAllModalOpen(false)}
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
              queryString={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <View style={{ flex: 1 }}>
              <FlatList
                data={resource.allQueryData}
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
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={2}
              />
            </View>
            {resource.nextPage ? (
              <RButton onPress={resource.fetchNextPage}>Load more</RButton>
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
              queryString={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <View style={{ flex: 1 }}>
            <FlatList
              data={resource.allQueryData}
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
            </View>
            {resource.nextPage ? (
              <RButton onPress={resource.fetchNextPage}>Load more</RButton>
            ) : null}
          </BaseDialog>
        </View>
      )}
    </>
  );
};
