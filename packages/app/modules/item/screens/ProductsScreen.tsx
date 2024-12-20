import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
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

export function ProductsScreen() {
  const sortOptions = useFeedSortOptions('products');
  const [sortValue, setSortValue] = useState(sortOptions[0]);
  const { overlayProps, onTriggerOpen } = useItemPackPicker();
  const [searchValue, setSearchValue] = useState();
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    currentPage,
    hasPrevPage,
    totalPages,
  } = useItemsFeed(sortValue, searchValue);
  const styles = useCustomStyles(loadStyles);
  const { xxs, xs, sm, md, lg } = useResponsive();

  const handleSortChange = (newSortValue: string) => {
    setSortValue(newSortValue);
  };

  const handleSetSearchValue = (v: string) => {
    setSearchValue(v);
  };

  const getNumColumns = () => {
    if (xxs || xs) return 1;
    if (sm) return 2;
    if (md) return 3;
    return 4;
  };

  const numColumns = getNumColumns();

  return (
    <Layout>
      <RStack style={styles.mainContainer}>
        <RStack style={styles.filterContainer}>
          <RStack style={styles.searchContainer}>
            <Form>
              <RStack
                style={{
                  flexDirection: 'row',
                  margin: 0,
                  padding: 0,
                  width: '100%',
                }}
              >
                <InputWithIcon
                  LeftIcon={<Search />}
                  RightIcon={<X />}
                  onChange={handleSetSearchValue}
                  placeholder={`Search ItemsFeed`}
                  value={searchValue}
                />
              </RStack>
            </Form>
          </RStack>

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
      </RStack>
      <PackPickerOverlay {...overlayProps} />
    </Layout>
  );
}

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  const { xxs, xs } = useResponsive();

  return {
    mainContainer: {
      flexDirection: 'column',
      height: '100%',
      padding: 10,
      alignItems: 'center',
      backgroundColor: currentTheme.colors.background,
      marginBottom: 50,
    },
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
      backgroundColor: currentTheme.colors.card,
      padding: 15,
      fontSize: 18,
      width: '100%',
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 8,
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
