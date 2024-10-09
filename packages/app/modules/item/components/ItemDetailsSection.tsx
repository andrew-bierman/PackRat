import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RText, RStack } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from '../constants';
import useTheme from 'app/hooks/useTheme';

const mockItemData = {
  title: 'Product Title',
  sku: 'SKU123',
  category: 'Product Category',
  weight: 2,
  unit: 'kg',
  description: 'This is a dummy description of the item for display purposes.',
  details: {
    key1: 'Value 1',
    key2: 'Value 2',
    key3: 'Value 3',
  },
};

export function ItemDetailsSection() {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();

  return (
    <RStack style={styles.container}>
      <RStack style={styles.contentContainer}>
        <RStack style={styles.imagePlaceholder}>
          <RText style={styles.placeholderText}>
            Image Section Placeholder
          </RText>
        </RStack>
        <RStack style={styles.detailsContainer}>
          <RStack style={styles.titleRow}>
            <RText style={styles.title}>{mockItemData.title}</RText>
            <RText style={styles.skuText}>SKU: {mockItemData.sku}</RText>
          </RStack>
          <RStack style={styles.infoRow}>
            <RStack style={{ flexDirection: 'column' }}>
              <RText>Category: {mockItemData.category}</RText>
              <RText style={styles.weightText}>
                Weight:{' '}
                {convertWeight(
                  mockItemData.weight,
                  SMALLEST_ITEM_UNIT,
                  mockItemData.unit,
                )}
                {mockItemData.unit}
              </RText>
            </RStack>
            <TouchableOpacity style={styles.visitStoreButton}>
              <RText style={styles.buttonText}>Visit Store</RText>
            </TouchableOpacity>
          </RStack>
          <RText>{mockItemData.description}</RText>
        </RStack>
      </RStack>
      <RStack style={styles.productDetailsSection}>
        <View style={styles.productDetailsHeader}>
          <RText style={styles.productDetailsHeading}>Product Details</RText>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color={currentTheme.colors.text}
          />
        </View>
        <RStack style={styles.additionalDetails}>
          {Object.entries(mockItemData.details).map(([key, value]) => (
            <RText key={key}>
              {key}: {value}
            </RText>
          ))}
        </RStack>
      </RStack>
    </RStack>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = useTheme();

  return {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: currentTheme.colors.card,
    },
    contentContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: '100%',
      width: '100%',
    },
    detailsContainer: {
      flex: 1,
      padding: 20,
    },
    imagePlaceholder: {
      width: '50%',
      height: 200,
      backgroundColor: currentTheme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    placeholderText: {
      color: currentTheme.colors.text,
      fontSize: 16,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    skuText: {
      fontSize: 16,
      fontWeight: '400',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    weightText: {
      marginRight: 10,
    },
    additionalDetails: {
      marginTop: 10,
    },
    visitStoreButton: {
      backgroundColor: currentTheme.colors.secondaryBlue,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 3,
      alignItems: 'center',
    },
    buttonText: {
      color: currentTheme.colors.text,
      fontWeight: 'bold',
      fontSize: 14,
    },
    productDetailsSection: {
      width: '100%',
      padding: 20,
      marginTop: 20,
      backgroundColor: currentTheme.colors.background,
      borderRadius: 5,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
    },
    productDetailsHeader: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: currentTheme.colors.secondaryBlue,
      borderRadius: 10,
    },
    productDetailsHeading: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  };
};
