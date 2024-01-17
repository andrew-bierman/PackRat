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
import { useFetchGlobalItems } from 'app/hooks/globalItems';
import useCustomStyles from 'app/hooks/useCustomStyles';

export default function Items() {
  // pagination index limit
  const [limit, setLimit] = useState(5);
  // page number for pagination
  const [page, setPage] = useState(1);

  const [refetch, setRefetch] = useState(false);

  const { data, isLoading, isError } = useFetchGlobalItems(limit, page);
  return (
    <RScrollView>

      <View>
        <>
          <BaseModal
            title="Add a global Item"
            trigger="Add Item"
            triggerComponent={<ModalTriggerButton />}
          >
            <AddItemGlobal setRefetch={setRefetch} refetch={refetch} />
          </BaseModal>
        </>
        {!isError &&
        data?.globalItems &&
        Array.isArray(data?.globalItems?.items) ? (
          <ItemsTable
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            data={data}
            isLoading={isLoading}
            totalPages={data?.globalItems?.totalPages ?? 0}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        ) : null}
      </View>
    </RScrollView>
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

const ModalTriggerButton = ({ setIsModalOpen }) => {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();

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
      {Platform.OS === 'web' ? (
        <RTooltip
          Label="Add a global item"
          Icon={
            <MaterialIcons
              name="info-outline"
              size={24}
              color={currentTheme.colors.background}
            />
          }
        />
      ) : null}
    </View>
  );
};
