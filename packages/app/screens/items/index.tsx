import { View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';
import { AddItemGlobal } from 'app/components/item/AddItemGlobal';
import { ItemsTable } from 'app/components/itemtable/itemTable';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItems } from 'app/hooks/items/useItems';
import { usePagination } from 'app/hooks/common';
import {
  BaseModal,
  DropdownComponent,
  RScrollView,
  RStack,
  RText,
} from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';

export default function Items() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const { data, isFetching, isError } = useItems({ limit, page });
  const styles = useCustomStyles(loadStyles);
  const [value, setValue] = useState('Food');

  // for zeego = {false} options will be:
  // const optionValues = ['Food', 'Water', 'Essentials'];

  // for zeego ={true} options will be:
  const optionValues = [
    { label: 'Food', value: 'Food' },
    { label: 'Water', value: 'Water' },
    { label: 'Essentials', value: 'Essentials' },
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
            <RText style={{ fontWeight: 'bold' }}>Sort By:</RText>
            <DropdownComponent
              value={value}
              data={optionValues}
              onValueChange={handleSort}
              placeholder={value}
              width="80%"
              native={true}
              zeego={true}
            />
          </RStack>
          <View style={{ marginBottom: 10 }}>
            <BaseModal title="Add a global Item" trigger="Add Item">
              <AddItemGlobal />
            </BaseModal>
          </View>
        </RStack>
        {!isError && data?.items && Array.isArray(data.items) && (
          <ItemsTable
            limit={limit}
            setLimit={handleLimitChange}
            page={page}
            setPage={handlePageChange}
            data={sortedItems}
            isLoading={isFetching}
            totalPages={data?.totalPages}
          />
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
      paddingTop: 10,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 30,
      borderRadius: 10,
    },
    sortContainer: {
      width: xxs ? '50%' : xs ? '50%' : '20%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
  };
};
