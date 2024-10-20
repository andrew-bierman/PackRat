import React, { useState, useEffect } from 'react';
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
import ItemCard from '../components/ItemCard';
import { useFeedSortOptions } from 'app/modules/feed/hooks/useFeedSortOptions';
import { useItemsFeed } from 'app/modules/item/hooks/useItemsFeed';
import { Search, X } from '@tamagui/lucide-icons';
import { PackPickerOverlay } from 'app/modules/pack';
import { useItemPackPicker } from '../hooks/useItemPackPicker';

interface Item {
  id: string;
  name: string;
  category: {
    name: string;
  };
  sku: string;
  seller: string;
  weight: number;
  unit: string;
  description: string;
  details?: {
    key1: string;
    key2: string;
    key3: string;
  };
}

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
    <RScrollView>
      <RStack style={styles.mainContainer}>
        <RStack style={styles.filterContainer}>
          <RStack style={styles.searchContainer}>
            <Form>
              <RStack style={{ flexDirection: 'row', margin: 0, padding: 0 }}>
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
          <RStack style={styles.sortContainer}>
            <RText style={{ fontWeight: 'bold', textWrap: 'nowrap' }}>
              Sort By:
            </RText>
            <RStack style={{ flex: 1 }}>
              <DropdownComponent
                value={sortValue}
                data={sortOptions}
                onValueChange={handleSortChange}
                placeholder="Select Sort Option"
                native={true}
                zeego={true}
              />
            </RStack>
          </RStack>
        </RStack>

        {isLoading ? (
          <RText>Loading...</RText>
        ) : (
          <RStack
            style={{
              padding: 20,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FlatList
              data={data}
              numColumns={numColumns}
              key={`flatlist-numColumns-${numColumns}`}
              keyExtractor={(item, index) =>
                `${item?.id}_${item?.type}_${index}`
              } // Ensure unique keys
              renderItem={({ item }) => (
                <RStack style={{ flex: 1 / numColumns, padding: 10 }}>
                  <ItemCard
                    itemData={item as Item}
                    onAddPackPress={onTriggerOpen}
                  />
                </RStack>
              )}
              onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={2}
            />
            {totalPages > 1 ? (
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
            ) : null}
          </RStack>
        )}
      </RStack>
      <PackPickerOverlay {...overlayProps} />
    </RScrollView>
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
    sortContainer: {
      width: xxs ? '100%' : xs ? '100%' : '20%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
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
