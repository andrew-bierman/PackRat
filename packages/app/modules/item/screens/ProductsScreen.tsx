import React, { useState } from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import {
  DropdownComponent,
  Form,
  InputWithIcon,
  Pagination,
  RScrollView,
  RStack,
  RText,
} from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import { ItemCard } from '../components/ItemCard';
import { useFeedSortOptions } from 'app/modules/feed/hooks/useFeedSortOptions';
import { useItemsFeed } from 'app/modules/item/hooks/useItemsFeed';
import { Search, X } from '@tamagui/lucide-icons';
import { PackPickerOverlay } from 'app/modules/pack';
import { useItemPackPicker } from '../hooks/useItemPackPicker';
import { FeedList } from 'app/modules/feed/components/FeedList';
import Layout from 'app/components/layout/Layout';
import FilterBadge from 'app/components/FilterBadge';
import { searchQueryAtom } from 'app/modules/feed/atoms';
import { useAtom } from 'jotai';
import { Platform } from 'react-native';

export function ProductsScreen() {
  const sortOptions = useFeedSortOptions('products');
  const [sortValue, setSortValue] = useState<string>(sortOptions[0] || '');
  const { overlayProps, onTriggerOpen } = useItemPackPicker();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    currentPage = 1,
    hasPrevPage,
    totalPages = 1,
  } = useItemsFeed(sortValue, searchQuery);
  const styles = useCustomStyles(loadStyles);
  const { xxs, xs, sm, md, lg } = useResponsive();

  const handleSortChange = (newSortValue: string) => {
    setSortValue(newSortValue);
  };

  return (
    <Layout>
      {Platform.OS === 'web' && (
        <RStack style={{ marginBottom: 10 }}>
          <InputWithIcon
            LeftIcon={<Search />}
            RightIcon={<X />}
            onChange={setSearchQuery}
            placeholder={`Search ItemsFeed`}
            value={searchQuery}
          />
        </RStack>
      )}
      <RStack style={styles.filterContainer}>
        <FilterBadge
          menuItems={sortOptions}
          selectedValue={sortValue}
          onSelect={handleSortChange}
        />
      </RStack>

      <FeedList
        data={data}
        CardComponent={({ item }) => (
          <ItemCard
            cardType="primary"
            item={item}
            onAddPackPress={onTriggerOpen}
          />
        )}
        isLoading={isLoading}
        separatorHeight={12}
      />
      {totalPages > 1 && (
        <RStack style={{ marginTop: 40 }}>
          <Pagination
            isPrevBtnDisabled={!hasPrevPage}
            isNextBtnDisabled={!hasNextPage}
            onPressPrevBtn={fetchPrevPage}
            onPressNextBtn={fetchNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </RStack>
      )}
      <PackPickerOverlay {...overlayProps} />
    </Layout>
  );
}

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  const { xxs, xs } = useResponsive();

  return {
    container: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: xs || xxs ? 'column' : 'row',
      gap: xs || xxs ? 4 : 0,
      justifyContent: 'space-between',
      width: '100%',
      padding: 30,
      borderRadius: 10,
    },

    cardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
    },
    filterContainer: {
      width: '100%',
      paddingBottom: 10,
      flexDirection: 'row',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
  };
};
