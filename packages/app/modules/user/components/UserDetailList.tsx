import React, { useRef, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { FeedCard, FeedSearchFilter } from 'app/modules/feed';
import { fuseSearch } from 'app/utils/fuseSearch';
import { BaseDialog, BaseModal, Pagination, RButton } from '@packrat/ui';
import { type PreviewResourceStateWithData } from 'app/hooks/common';
import RSecondaryButton from 'app/components/RSecondaryButton';

interface DataListProps {
  resource: PreviewResourceStateWithData;
  search: string;
  onSearchChange: (search: string) => void;
}

const windowHeight = Dimensions.get('window').height;

export const UserDataList = ({
  resource,
  search,
  onSearchChange,
}: DataListProps) => {
  return (
    <>
      {Platform.OS == 'web' ? (
        <BaseDialog
          title={`${resource.resourceName} List`}
          triggerComponent={<RSecondaryButton label="View in list" />}
        >
          <View
            style={
              {
                width: '100vw',
                paddingBottom: 10,
                maxWidth: 992,
                height: windowHeight * 0.8,
                flexDirection: 'column',
              } as any
            }
          >
            <FeedSearchFilter
              isSortHidden={true}
              queryString={search}
              setSearchQuery={onSearchChange}
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
            {resource.totalPages > 1 ? (
              <Pagination
                currentPage={resource.currentPage}
                totalPages={resource.totalPages}
                isPrevBtnDisabled={!resource.hasPrevPage}
                isNextBtnDisabled={!resource.hasNextPage}
                onPressPrevBtn={resource.fetchPrevPage}
                onPressNextBtn={resource.fetchNextPage}
              />
            ) : null}
          </View>
        </BaseDialog>
      ) : (
        <BaseDialog
          title={`${resource.resourceName} List`}
          triggerComponent={<RSecondaryButton label="View in list" />}
        >
          <FeedSearchFilter
            isSortHidden={true}
            queryString={search}
            setSearchQuery={onSearchChange}
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
      )}
    </>
  );
};
