import { View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box } from 'native-base';
import {
  RButton as Button,
  RScrollView as ScrollView,
  RTooltip as Tooltip,
} from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from 'app/theme';
import useTheme from 'app/hooks/useTheme';
import { AddItemGlobal } from 'app/components/item/AddItemGlobal';
import { ItemsTable } from 'app/components/itemtable/itemTable';
// import { Stack } from 'expo-router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItems } from 'app/hooks/items/useItems';
import { BaseModal } from '@packrat/ui';
import { usePagination } from 'app/hooks/common';
// import { checkNetworkConnected } from 'app/utils/netInfo';

export default function Items() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const { data, isFetching, isError } = useItems({ limit, page });
  const styles = useCustomStyles(loadStyles);

  return (
    <ScrollView>
      {/* <Stack.Screen
        options={{
          title: 'Items',
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

const ModalTriggerButton = ({ setIsModalOpen }) => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        style={styles.button}
        onPress={() => {
          setIsModalOpen(true);
        }}
      >
        Add Item
      </Button>
      {Platform.OS === 'web' && (
        <Tooltip label="Add a global item" placement="top left" openDelay={500}>
          <Button width={8} height={8} style={{ backgroundColor: 'none' }}>
            <MaterialIcons
              name="info-outline"
              size={20}
              color={currentTheme.colors.background}
            />
          </Button>
        </Tooltip>
      )}
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    container: {
      backgroundColor: currentTheme.colors.background,
      flexDirection: 'column',
      flex: 1,
      paddingTop: 10,
    },
    button: {
      color: currentTheme.colors.white,
      width: Platform.OS === 'web' ? '20rem' : '20%',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
  };
};
