import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from 'app/theme';
import useTheme from 'app/hooks/useTheme';
import { RTooltip, RButton, RScrollView, BaseModal } from '@packrat/ui';
import { AddItemGlobal } from 'app/components/item/AddItemGlobal';
import { ItemsTable } from 'app/components/itemtable/itemTable';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsGlobal } from 'app/store/globalItemsStore';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useFetchGlobalItems } from 'app/hooks/globalItems';
import useCustomStyles from 'app/hooks/useCustomStyles';
import Items from 'app/screens/items/index';

export default function ItemsScreen() {
  // pagination index limit
  const [limit, setLimit] = useState(5);
  // page number for pagination
  const [page, setPage] = useState(1);

  const [refetch, setRefetch] = useState(false);

  const { data, isLoading, isError } = useFetchGlobalItems(limit, page);
  return (
    <RScrollView>
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
      <Items/>
    </RScrollView>
  );
}