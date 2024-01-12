import { View, Platform } from 'react-native';
import React from 'react';
import { Box, Button, ScrollView, Tooltip } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { AddItemGlobal } from '../../components/item/AddItemGlobal';
import { ItemsTable } from '../../components/itemtable/itemTable';

import { Stack } from 'expo-router';
import useCustomStyles from 'hooks/useCustomStyles';
import { BaseModal } from '@packrat/ui';
import { useItemScreen } from 'hooks/itemrow';
// import { checkNetworkConnected } from 'app/utils/netInfo';

export default function Items() {
  const styles = useCustomStyles(loadStyles);
  const {
    data,
    isLoading,
    isError,
    isAddItemModalOpen,
    setIsAddItemModalOpen,
    limit,
    setLimit,
    page,
    setPage,
    refetch,
    setRefetch,
  } = useItemScreen();

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Items',
        }}
      />
      <Box style={styles.container}>
        <BaseModal
          title="Add a global Item"
          trigger="Add Item"
          triggerComponent={<ModalTriggerButton />}
        >
          <AddItemGlobal setRefetch={setRefetch} refetch={refetch} />
        </BaseModal>
        {!isError &&
          data.globalItems &&
          Array.isArray(data.globalItems.items) && (
            <ItemsTable
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              data={data}
              isLoading={isLoading}
              totalPages={data?.globalItems?.totalPages}
              refetch={refetch}
              setRefetch={setRefetch}
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
