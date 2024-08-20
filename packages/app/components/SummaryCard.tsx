import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import useSummaryCardLogic from 'app/hooks/card/useSummaryCardLogic';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { ItemRow } from '../modules/item/components/ItemRow/ItemRow';

export default function SummaryCard() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const { dummyData, handleDelete, handleEdit } = useSummaryCardLogic();
  const styles = useCustomStyles(loadStyles);

  return (
    <View
      style={[
        styles.mainContainer,
        { marginVertical: 20, width: '35%', alignSelf: 'center' },
      ]}
    >
      <View>
        <Text>Image here</Text>
      </View>
      <View style={styles.itemContainer}>
        {dummyData.map((data, id) => (
          <ItemRow key={id} packName={data} />
        ))}
        <FontAwesome
          style={{ padding: 8, alignSelf: 'flex-start' }}
          name="plus-circle"
          size={24}
          color={currentTheme.colors.cardIconColor}
        />
      </View>
    </View>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      gap: 10,
    },

    itemContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: currentTheme.colors.card,
      padding: 5,
      justifyContent: 'space-between',
    },
  };
};
