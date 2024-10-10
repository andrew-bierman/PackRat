import React, { useState } from 'react';
import { View } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { DropdownComponent, RScrollView, RStack, RText } from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import ItemCard from '../components/ItemCard';

interface Item {
  id: number;
  name: string;
  category: {
    name: string;
  };
  sku: string;
  seller: string;
  weight: number;
  unit: string;
  description: string;
  details?: {
    key1: string;
    key2: string;
    key3: string;
  };
}

const mockItems: Item[] = [
  {
    id: 1,
    name: 'Apple',
    category: { name: 'Food' },
    sku: 'SKU123',
    seller: 'FruitSeller',
    weight: 0.2,
    unit: 'kg',
    description: 'Fresh apple from the farm.',
  },
  {
    id: 2,
    name: 'Water Bottle',
    category: { name: 'Water' },
    sku: 'SKU124',
    seller: 'WaterSeller',
    weight: 1.0,
    unit: 'L',
    description: 'Clean drinking water.',
  },
  {
    id: 3,
    name: 'Toothpaste',
    category: { name: 'Essentials' },
    sku: 'SKU125',
    seller: 'DailySeller',
    weight: 0.05,
    unit: 'kg',
    description: 'Mint-flavored toothpaste.',
    details: { key1: 'Detail1', key2: 'Detail2', key3: 'Detail3' },
  },
];

export function ItemsScreen() {
  const styles = useCustomStyles(loadStyles);
  const [value, setValue] = useState<string>('Food');

  const optionValues = [
    { label: 'Food', value: 'Food' },
    { label: 'Water', value: 'Water' },
    { label: 'Essentials', value: 'Essentials' },
    { label: 'All items', value: 'All items' },
  ];

  const sortItemsByCategory = (items: Item[], selectedCategory: string) => {
    if (!items) return [];
    if (selectedCategory === 'All items') return items;
    return items.filter((item) => item.category.name === selectedCategory);
  };

  const handleSort = (category: string) => {
    setValue(category);
  };

  const sortedItems = sortItemsByCategory(mockItems, value);

  return (
    <RScrollView>
      <RStack style={styles.mainContainer}>
        <RStack style={styles.container}>
          <RStack style={styles.sortContainer}>
            <RText style={{ fontWeight: 'bold', textWrap: 'nowrap' }}>
              Sort By:
            </RText>
            <View style={{ flex: 1 }}>
              <DropdownComponent
                value={value}
                data={optionValues}
                onValueChange={handleSort}
                placeholder={value}
                native={true}
                zeego={true}
              />
            </View>
          </RStack>
        </RStack>

        <View style={{ padding: 20, width: '100%' }}>
          {sortedItems.map((item) => (
            <View key={item.id} style={styles.cardsContainer}>
              <ItemCard itemData={item} />
            </View>
          ))}
        </View>
      </RStack>
    </RScrollView>
  );
}

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  const { xxs, xs } = useResponsive();

  return {
    mainContainer: {
      flexDirection: 'column',
      height: 800,
      padding: 10,
      alignItems: 'center',
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
    cardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
    },
  };
};
