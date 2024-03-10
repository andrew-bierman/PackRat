import { View, Platform, RefreshControl } from 'react-native';
import React from 'react';
import { Box, Button, Tooltip } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from 'app/theme';
import useTheme from 'app/hooks/useTheme';
import { AddItemGlobal } from 'app/components/item/AddItemGlobal';
import { ItemsTable } from 'app/components/itemtable/itemTable';
// import { Stack } from 'expo-router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItems } from 'app/hooks/items/useItems';
import { BaseModal, RButton, RScrollView, RStack, RTooltip } from '@packrat/ui';
import { usePagination } from 'app/hooks/common';
// import { checkNetworkConnected } from 'app/utils/netInfo';

export default function Items() {
  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const { data, isFetching, isError, refetch } = useItems({ limit, page });
  const styles = useCustomStyles(loadStyles);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
      setRefreshing(false);
    }, 2000);
  }, []);

  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  return (
    <RScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <Stack.Screen
        options={{
          title: 'Items',
        }}
      /> */}
      <RStack style={styles.container}>
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
      </RStack>
    </RScrollView>
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
      <RButton
        style={styles.button}
        onPress={() => {
          setIsModalOpen(true);
        }}
      >
        Add Item
      </RButton>
      {Platform.OS === 'web' && (
        <RTooltip
          label="Add a global item"
          placement="top left"
          openDelay={500}
        >
          <RButton width={8} height={8} style={{ backgroundColor: 'none' }}>
            <MaterialIcons
              name="info-outline"
              size={20}
              color={currentTheme.colors.background}
            />
          </RButton>
        </RTooltip>
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
