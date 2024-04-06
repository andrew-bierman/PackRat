import React, { useRef, useMemo, useState } from 'react';
import { ScrollView, View, FlatList, Platform } from 'react-native';
import Fuse from 'fuse.js';
import Card from '../../components/feed/FeedCard';
import SearchFilter from '../../components/feed/FeedSearchFilter';
import { fuseSearch } from '../../utils/fuseSearch';
import { BaseDialog, BaseModal } from '@packrat/ui';
// import BottomSheet from '@gorhom/bottom-sheet';

interface DataItem {
  _id: string;
  type: string;
}

interface DataListProps {
  data: DataItem[];
}

const DataList = ({ data }: DataListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const keys = ['name', 'items.name', 'items.category'];
  const options = {
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
  };

  const results = fuseSearch(data, searchQuery, keys, options);
  const filteredData = searchQuery
    ? results.map((result) => result.item)
    : data;

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
          <View style={{ width: 'auto%', paddingBottom: 10 }}>
            <SearchFilter
              isSortHidden={true}
              value={searchQuery}
              onChange={() => {
                setSearchQuery;
              }}
            />
            <FlatList
              data={filteredData.slice(0, 2)}
              horizontal={false}
              keyExtractor={(item) => item?._id + item?.type}
              renderItem={({ item }) => (
                <Card key={item?._id} type={item?.type} {...item} />
              )}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={2}
            />
          </View>
        </BaseModal>
      ) : (
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
          <SearchFilter
            isSortHidden={true}
            value={searchQuery}
            onChange={() => {
              setSearchQuery;
            }}
          />

          <FlatList
            data={filteredData}
            horizontal={false}
            keyExtractor={(item) => item?._id + item?.type}
            renderItem={({ item }) => (
              <Card key={item?._id} type={item?.type} {...item} />
            )}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
          />
        </BaseDialog>
      )}
    </>
  );
};

export default DataList;
