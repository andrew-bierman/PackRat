import { View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Button, ScrollView, Tooltip } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { CustomModal } from '../../components/modal';
import { AddItemGlobal } from '../../components/item/AddItemGlobal';
import { ItemsTable } from '../../components/itemtable/itemTable';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsGlobal } from '../../store/globalItemsStore';
import { Stack } from 'expo-router';
import { useItemsLogic } from '../../hooks/items/useItemsLogic';
import { executeOfflineRequests } from '../../store/offlineQueue';
import useCustomStyles from '~/hooks/useCustomStyles';
// import { checkNetworkConnected } from '~/utils/netInfo';

export default function Items() {
  const {
    isAddItemModalOpen,
    setIsAddItemModalOpen,
    currentTheme,
    limit,
    setLimit,
    page,
    setRefetch,
    data,
    isLoading,
    isError,
  } = useItemsLogic();
  const styles = useCustomStyles(loadStyles);

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Items',
        }}
      />
      <Box style={styles.container}>
        <CustomModal
          title="Add a global Item"
          trigger="Add Item"
          isActive={isAddItemModalOpen}
          onTrigger={setIsAddItemModalOpen}
          triggerComponent={
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
                  setIsAddItemModalOpen(true);
                }}
              >
                Add Item
              </Button>
              {Platform.OS === 'web' && (
                <Tooltip
                  label="Add a global item"
                  placement="top left"
                  openDelay={500}
                >
                  <Button
                    width={8}
                    height={8}
                    style={{ backgroundColor: 'none' }}
                  >
                    <MaterialIcons
                      name="info-outline"
                      size={20}
                      color={currentTheme.colors.background}
                    />
                  </Button>
                </Tooltip>
              )}
            </View>
          }
          onCancel={setIsAddItemModalOpen}
        >
          <AddItemGlobal
            setRefetch={setRefetch}
            refetch={refetch}
            setIsAddItemModalOpen={setIsAddItemModalOpen}
          />
        </CustomModal>
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
