import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { Pagination, RScrollView, RStack, RText } from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import ItemCard from '../components/ItemCard';
import { useItemsFeed } from '../hooks';

interface Item {
  id: number;
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

export function ItemsFeed() {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    currentPage,
    hasPrevPage,
    totalPages,
  } = useItemsFeed();
  const styles = useCustomStyles(loadStyles);
  const { xxs, xs, sm, md, lg } = useResponsive();

  if (isLoading) {
    return null;
  }

  const getNumColumns = () => {
    if (xxs || xs) return 1;
    if (sm) return 2;
    if (md) return 3;
    return 4;
  };

  const numColumns = getNumColumns();

  console.log({ data });

  return (
    <RScrollView>
      <RStack style={styles.mainContainer}>
        <RStack style={styles.container}>
          <RStack style={styles.sortContainer}>
            <RText style={{ fontWeight: 'bold', textWrap: 'nowrap' }}>
              Sort By:
            </RText>
            <View style={{ flex: 1 }}>
              {/* <DropdownComponent
                value={value}
                data={optionValues}
                onValueChange={handleSort}
                placeholder={value}
                native={true}
                zeego={true}
              /> */}
            </View>
          </RStack>
        </RStack>

        <View style={{ padding: 20, width: '100%' }}>
          <FlatList
            data={data}
            numColumns={numColumns}
            key={`flatlist-numColumns-${numColumns}`}
            keyExtractor={(item, index) => `${item?.id}_${item?.type}_${index}`} // Ensure unique keys
            renderItem={({ item }) => (
              <View style={{ flex: 1 / numColumns, padding: 10 }}>
                <ItemCard itemData={item as Item} />
              </View>
            )}
            onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
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
      </RStack>
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
  };
};
