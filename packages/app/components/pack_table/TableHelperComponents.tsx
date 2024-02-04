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

const useWeightUnits = () => {
  return ['kg', 'g', 'lb', 'oz'];
};

const formatWeight = (weight: number, unit: string) => {
  return `${formatNumber(weight)} (${unit})`;
};

const WeightUnitDropdown = ({ value, onChange }) => {
  const weightUnits = useWeightUnits();

  return (
    <DropdownComponent
      value={value}
      accessibilityLabel="Select weight unit"
      placeholder="Select weight unit"
      onValueChange={(itemValue) => onChange(itemValue)}
      data={weightUnits}
    />
  );
};

const TotalWeightBox = ({ label, weight, unit }) => {
  const styles = useCustomStyles(loadStyles);
  const formattedWeight = formatWeight(weight, unit);

  return (
    <View style={styles.totalWeightBox}>
      <RText>{label}</RText>
      <RText>{formattedWeight}</RText>
    </View>
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

const ErrorMessage = ({ message }) => <RText>{message}</RText>;

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

export {
  CategoryRow,
  ErrorMessage,
  IgnoreItemCheckbox,
  TitleRow,
  TotalWeightBox,
  WeightUnitDropdown,
};
