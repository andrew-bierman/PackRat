import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AddItemGlobal, ImportItemGlobal } from '../components';
import { ItemsTable } from 'app/modules/item/components/itemtable/itemTable';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItems } from 'app/modules/item';
import { usePagination } from 'app/hooks/common';
import {
  BaseModal,
  DropdownComponent,
  RScrollView,
  RStack,
  RText,
} from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import { useAuthUser } from 'app/modules/auth';

export function ItemsScreen() {
  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const { data, isFetching, isError } = useItems({ limit, page });
  const styles = useCustomStyles(loadStyles);
  const [value, setValue] = useState('Food');

  const authUser = useAuthUser();
  const role = authUser?.role;

  // for zeego = {false} options will be:
  // const optionValues = ['Food', 'Water', 'Essentials'];

  // for zeego ={true} options will be:
  const optionValues = [
    { label: 'Food', value: 'Food' },
    { label: 'Water', value: 'Water' },
    { label: 'Essentials', value: 'Essentials' },
    { label: 'All items', value: 'All items' },
  ];

  const sortItemsByCategory = (items, selectedCategory) => {
    if (!items) {
      return [];
    }
    const selectedCategoryItems = items.filter(
      (item) => item.category.name === selectedCategory,
    );
    const otherItems = items.filter(
      (item) => item.category.name !== selectedCategory,
    );

    selectedCategoryItems.sort((a, b) => a.name.localeCompare(b.name));
    otherItems.sort((a, b) => a.name.localeCompare(b.name));

    return [...selectedCategoryItems, ...otherItems];
  };

  const [sortedItems, setSortedItems] = useState(
    sortItemsByCategory(data?.items, value),
  );

  const handleSort = (category) => {
    setValue(category);
    const sorted = sortItemsByCategory(data?.items, category);
    setSortedItems(sorted);
  };

  useEffect(() => {
    const sorted = sortItemsByCategory(data?.items, value);
    setSortedItems(sorted);
  }, [data]);

  return (
    <RScrollView>
      <RStack style={styles.mainContainer}>
        <RStack style={styles.container}>
          <RStack style={styles.sortContainer}>
            <RText style={{ fontWeight: 'bold', textWrap: 'nowrap' }}>
              Sort By:
            </RText>
            <View style={{ flex: 1 }}>
              <DropdownComponent
                value={value}
                data={optionValues}
                onValueChange={handleSort}
                placeholder={value}
                native={true}
                zeego={true}
              />
            </View>
          </RStack>
          <View
            style={{
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 5,
            }}
          >
            <BaseModal title="Add a global Item" trigger="Add Item">
              <AddItemGlobal />
            </BaseModal>
            {role === 'admin' && (
              <BaseModal title="Import global Item" trigger="Import Item">
                <ImportItemGlobal />
              </BaseModal>
            )}
          </View>
        </RStack>
        {!isError && data?.items && Array.isArray(data.items) && (
          <View style={{ padding: 10, width: '100%' }}>
            <ItemsTable
              limit={limit}
              setLimit={handleLimitChange}
              page={page}
              setPage={handlePageChange}
              data={sortedItems}
              isLoading={isFetching}
              totalPages={data?.totalPages}
            />
          </View>
        )}
      </RStack>
    </RScrollView>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const { xxs, xs } = useResponsive();

  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flexDirection: 'column',
      flex: 1,
      padding: 10,
      alignItems: 'center',
    },
    button: {
      color: currentTheme.colors.white,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
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
  };
};
