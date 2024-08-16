import React, { useRef, useMemo, useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { FeedCard, FeedSearchFilter } from 'app/modules/feed';
import { fuseSearch } from '../../utils/fuseSearch';
import { BaseDialog as OriginalBaseDialog, BaseModal } from '@packrat/ui';
// import BottomSheet from '@gorhom/bottom-sheet';

const BaseDialog: any = OriginalBaseDialog;

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
          <View style={{ width: 'auto%', paddingBottom: 10 } as any}>
            <FeedSearchFilter
              isSortHidden={true}
              queryString={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <FlatList
              data={filteredData.slice(0, 2)}
              horizontal={false}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <FeedCard key={item?._id} type={item?.type} {...item} />
              )}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={2}
            />
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

            <FlatList
              data={filteredData}
              horizontal={false}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => (
                <FeedCard key={item?._id} type={item?.type} {...item} />
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

export default DataList;
