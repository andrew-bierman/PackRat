import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Button, ScrollView } from 'native-base';
import { StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../theme';
import UseTheme from '../../../hooks/useTheme';
import { Tooltip } from 'native-base';
import { CustomModal } from '../../../components/modal';
import { AddItemGlobal } from '../../../components/item/AddItemGlobal';
import { ItemsTable } from '../../../components/itemtable/itemTable';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsGlobal } from '../../../store/globalItemsStore';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useFetchGlobalItems } from '~/hooks/globalItems';
import useCustomStyles from '~/hooks/useCustomStyles';

export default function Items() {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const onTrigger = (event) => {
    setIsAddItemModalOpen(event);
  };
  // pagination index limit
  const [limit, setLimit] = useState(5);
  // page number for pagination
  const [page, setPage] = useState(1);
  // it will be used as a dependency for reloading the data in case of some modifications
  const [refetch, setRefetch] = useState(false);

  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();

  const { data, isLoading, isError } = useFetchGlobalItems(limit, page);
  console.log('data', data);
  return (
    <ScrollView>
      {Platform.OS === 'web' && (
        <Head>
          <title>Items</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          title: 'Items',
          name: 'Items',
        }}
      />
      <>
        <CustomModal
          title="Add a global Item"
          trigger="Add Item"
          isActive={isAddItemModalOpen}
          onTrigger={onTrigger}
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
              {' '}
              <Button
                style={loadStyles().button}
                onPress={() => {
                  setIsAddItemModalOpen(true);
                }}
              >
                Add Item
              </Button>
              {Platform.OS === 'web' ? (
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
              ) : null}
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
      </>
      {!isError && Array.isArray(data.items) ? (
        <ItemsTable
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          data={data.items}
          isLoading={isLoading}
          totalPages={data?.totalPages}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      ) : null}
    </ScrollView>
  );
}
const loadStyles = () => {
  const currentTheme = theme;
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1rem',
      alignItems: 'center',
    },
    button: {
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.white,
      width: Platform.OS === 'web' ? '20rem' : '20%',
      alignItems: 'center',
      textAlign: 'center',
    },
  };
};
