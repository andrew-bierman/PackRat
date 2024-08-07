import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import { AddItemGlobal } from 'app/components/item/AddItemGlobal';
import { ImportItemGlobal } from 'app/components/item/ImportItemGlobal';
import { ItemsTable } from 'app/components/itemtable/itemTable';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useItem, useItemId } from 'app/hooks/items';
import { usePagination } from 'app/hooks/common';
import {
  BaseModal,
  DropdownComponent,
  RImage,
  RScrollView,
  RStack,
  RText,
  XStack,
} from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import { CustomCard } from 'app/components/card';

export default function ItemDetails() {
  const { limit, handleLimitChange, page, handlePageChange } = usePagination();
  const [itemId] = useItemId();
  const { data: item, isError } = useItem(itemId);
  const styles = useCustomStyles(loadStyles);
  console.log({ item, itemId });

  return (
    <RScrollView>
      <RStack style={styles.mainContainer}>
        {!isError && item && (
          <View style={{ padding: 10, width: '100%' }}>
            <CustomCard
              data={item}
              title={item?.name}
              content={
                <XStack gap="$4">
                  <RImage
                    src="https://via.placeholder.com/150"
                    width={150}
                    height={150}
                  />
                  {item?.name && (
                    <RStack>
                      <RText>Category: {item?.category?.name || '-'}</RText>
                      <RText>
                        Weight: {item?.weight}
                        {item?.unit}
                      </RText>
                      <RText>Quantity: {item?.quantity}</RText>
                    </RStack>
                  )}
                </XStack>
              }
              type="item"
            />
          </View>
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
      padding: 10,
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
      flexDirection: xs || xxs ? 'column' : 'row',
      gap: xs || xxs ? 4 : 0,
      justifyContent: 'space-between',
      width: '100%',
      padding: 30,
      borderRadius: 10,
    },
    sortContainer: {
      width: xxs ? '100%' : xs ? '100%' : '20%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
  };
};
