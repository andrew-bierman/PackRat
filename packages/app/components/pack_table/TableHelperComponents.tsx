import { Feather } from '@expo/vector-icons';
import { RButton, RCheckbox, RSkeleton, RStack, RText } from '@packrat/ui';
import { FlatList, Platform, View } from 'react-native';
import { Cell, Row, Table } from 'react-native-table-component';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import DropdownComponent from '../Dropdown';
import { categoryIcons } from 'app/constants/pack/icons';
import { formatNumber } from 'app/utils/formatNumber';
import loadStyles from './PackTableStyles';
import React from 'react';

const TitleRow = ({ title }) => {
  const styles = useCustomStyles(loadStyles);
  const rowData = [
    <RStack style={{ flexDirection: 'row', ...styles.mainTitle }}>
      <RText fontSize="$2" style={styles.titleText}>
        {title}
      </RText>
    </RStack>,
  ];

  return (
    <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
  );
};

const CategoryRow = ({ category }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  const rowData = [
    <RStack style={{ flexDirection: 'row', gap: 8, ...styles.categoryRow }}>
      <Feather
        name={categoryIcons[category]}
        size={16}
        color={currentTheme.colors.white}
      />
      <RText fontSize="$2" style={styles.titleText}>
        {' '}
        {category}
      </RText>
    </RStack>,
  ];

  return (
    <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
  );
};

const IgnoreItemCheckbox = ({ itemId, isChecked, handleCheckboxChange }) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}
  >
    <RCheckbox
      id={itemId}
      value="Ignore Item"
      checked={isChecked}
      onCheckedChange={() => handleCheckboxChange(itemId)}
      aria-label="Ignore item"
    />
  </View>
);

const WeightUnitDropdown = ({ value, onChange }) => {
  return (
    <DropdownComponent
      value={value}
      accessibilityLabel="Select weight unit"
      placeholder="Select weight unit"
      onValueChange={(itemValue) => onChange(itemValue)}
      data={['kg', 'g', 'lb', 'oz']}
    />
  );
};

const TotalWeightBox = ({ label, weight, unit }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <View style={styles.totalWeightBox}>
      <RText>{label}</RText>
      <RText>{`${formatNumber(weight)} (${unit})`}</RText>
    </View>
  );
};

const ErrorMessage = ({ message }) => <RText>{message}</RText>;

export {
  WeightUnitDropdown,
  TotalWeightBox,
  IgnoreItemCheckbox,
  ErrorMessage,
  CategoryRow,
  TitleRow,
};
