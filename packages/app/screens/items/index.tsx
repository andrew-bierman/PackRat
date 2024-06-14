import { View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';
import { AddItemGlobal } from 'app/components/item/AddItemGlobal';
import { ItemsTable } from 'app/components/itemtable/itemTable';
// import { Stack } from 'expo-router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItems } from 'app/hooks/items/useItems';
import { usePagination } from 'app/hooks/common';
import DropdownComponent from 'app/components/Dropdown';
import { BaseModal, RScrollView, RStack, RText } from '@packrat/ui';
import { useMedia } from 'tamagui';
// import { checkNetworkConnected } from 'app/utils/netInfo';

// const RTooltip: any = OriginalRTooltip;
// const BaseModal: any = OriginalBaseModal;
// const RButton: any = OriginalRButton;

export default function Items() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const { data, isFetching, isError } = useItems({ limit, page });
  const styles = useCustomStyles(loadStyles);
  const [value, setValue] = useState('Food');
  const optionValues = ['Food', 'Water', 'Essentials'];

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

  const { xs, xxxs, xxs } = useMedia();

  return (
    <RScrollView>
      {/* <Stack.Screen
        options={{
          title: 'Items',
        }}
      /> */}
      <RStack style={styles.mainContainer}>
        <RStack
          style={{
            width: xs ? '80vw' : '60vw',
            ...styles.container,
          }}
        >
          <RStack
            style={{
              width: xs ? '45vw' : '40vw',
              ...styles.sortContainer,
            }}
          >
            <RText style={{ fontWeight: 'bold' }}>Sort By:</RText>
            <DropdownComponent
              value={value}
              data={optionValues}
              onValueChange={handleSort}
              placeholder={value}
              width={xxxs ?'25vw': xxs ? 120 : xs ? '25vw' : '15vw'}
            />
          </RStack>
          <BaseModal
            title="Add a global Item"
            trigger="Add Item"
            // triggerComponent={<ModalTriggerButton />}
          >
            <AddItemGlobal />
          </BaseModal>
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

// const ModalTriggerButton = ({ setIsModalOpen }) => {
//   const { currentTheme } = useTheme();
//   const styles = useCustomStyles(loadStyles);

//   return (
//     <View
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         marginTop: '2rem',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <RButton
//         style={styles.button}
//         onPress={() => {
//           setIsModalOpen(true);
//         }}
//       >
//         Add Item
//       </RButton>
//       {Platform.OS === 'web' && (
//         <RTooltip
//           label="Add a global item"
//           placement="top left"
//           openDelay={500}
//         >
//           <RButton width={8} height={8} style={{ backgroundColor: 'none' }}>
//             <MaterialIcons
//               name="info-outline"
//               size={20}
//               color={currentTheme.colors.background}
//             />
//           </RButton>
//         </RTooltip>
//       )}
//     </View>
//   );
// };

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const {xxs,xxxs} = useMedia();

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
      width: xxs ? '20%' : '20rem',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
    container: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 30,
      borderRadius: 10,
    },
    sortContainer: {
      flexDirection: 'row',
      gap: xxxs ? 10 : xxs ? 60: 10,
      alignItems: 'center',
    },
  };
};
