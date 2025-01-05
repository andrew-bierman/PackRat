import React from 'react';
import { RText, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from '../constants';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';
import { type WeightUnit } from 'app/utils/convertWeight';

interface ItemPrimaryDetailsSectionProps {
  weight: number;
  unit: string;
  sku: string;
  seller: string;
}

const ItemPrimaryDetailsSection: React.FC<ItemPrimaryDetailsSectionProps> = ({
  weight,
  unit,
  sku,
  seller,
}) => {
  const styles = useCustomStyles(loadStyles);

  return (
    <RStack style={styles.container}>
      <RStack style={styles.keyValueRow}>
        <RStack style={styles.keyValueItem}>
          <RText style={styles.keyText}>Weight:</RText>
          <RText style={styles.valueText}>
            {convertWeight(weight, SMALLEST_ITEM_UNIT, unit as WeightUnit)}
            {unit}
          </RText>
        </RStack>

        <RStack style={styles.keyValueItem}>
          <RText style={styles.keyText}>SKU:</RText>
          <RText style={styles.valueText}>{sku}</RText>
        </RStack>

        <RStack style={styles.keyValueItem}>
          <RText style={styles.keyText}>Seller:</RText>
          <RText style={styles.valueText}>{seller}</RText>
        </RStack>
      </RStack>
    </RStack>
  );
};

const loadStyles = () => {
  const { currentTheme } = useTheme();
  const { xxs, xs, sm } = useResponsive();

  return {
    container: {
      borderWidth: 1,
      borderColor: currentTheme.colors.cardBorderPrimary,
      borderRadius: 10,
      padding: xxs ? 8 : 10,
      backgroundColor: currentTheme.colors.card,
      marginBottom: 20,
    },
    keyValueRow: {
      flexDirection: 'column',
      gap: 8,
    },
    keyValueItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    keyText: {
      fontSize: xxs ? 12 : xs ? 14 : 16,
      fontWeight: '600',
      color: currentTheme.colors.text,
    },
    valueText: {
      fontSize: xxs ? 12 : xs ? 14 : 16,
      fontWeight: '400',
      color: currentTheme.colors.textSecondary,
    },
  };
};

export default ItemPrimaryDetailsSection;
