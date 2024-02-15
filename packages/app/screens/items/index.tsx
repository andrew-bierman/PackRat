import React from 'react';
import { Box, ScrollView } from 'native-base';
import useTheme from 'app/hooks/useTheme';
import { AddItemGlobal } from 'app/components/item/AddItemGlobal';
import { ItemsTable } from 'app/components/itemtable/itemTable';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItems } from 'app/hooks/items/useItems';
import { BaseModal } from '@packrat/ui';
import { usePagination } from 'app/hooks/common';
import { loadStyles } from './itemsComponent.style';

const useItemsWithPagination = () => {
  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const { data, isFetching, isError } = useItems({ limit, page });

  return {
    limit,
    handleLimitChange,
    page,
    handlePageChange,
    data,
    isFetching,
    isError,
  };
};

export default function Items() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  const {
    limit,
    handleLimitChange,
    page,
    handlePageChange,
    data,
    isFetching,
    isError,
  } = useItemsWithPagination();

  return (
    <ScrollView>
      {/* <Stack.Screen
        options={{
          title: 'Items',
          const useItemsWithPagination = () => {
  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const { data, isFetching, isError } = useItems({ limit, page });

  return {
    limit,
    handleLimitChange,
    page,
    handlePageChange,
    data,
    isFetching,
    isError,
  };
};

        }}
      /> */}
      <Box style={styles.container}>
        <BaseModal
          title="Add a global Item"
          trigger="Add Item"
          // triggerComponent={<ModalTriggerButton />}
        >
          <AddItemGlobal />
        </BaseModal>
        {!isError && data?.items && Array.isArray(data.items) && (
          <ItemsTable
            limit={limit}
            setLimit={handleLimitChange}
            page={page}
            setPage={handlePageChange}
            data={data.items}
            isLoading={isFetching}
            totalPages={data?.totalPages}
          />
        )}
      </Box>
    </ScrollView>
  );
}
