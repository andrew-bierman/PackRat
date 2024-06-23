import { MaterialIcons, Feather as OriginalFeather } from '@expo/vector-icons';
import {
  RButton,
  RCheckbox,
  RSkeleton,
  RStack,
  RText as OriginalRText,
  RContextMenu,
  RIconButton,
} from '@packrat/ui';
import { Platform, View } from 'react-native';
import { Row } from 'react-native-table-component';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import DropdownComponent from '../Dropdown';
import { categoryIcons } from 'app/constants/pack/icons';
import { formatNumber } from 'app/utils/formatNumber';
import loadStyles from './packtable.style';
import React from 'react';

const RText: any = OriginalRText;
const Feather: any = OriginalFeather;

interface WeightUnitDropdownProps {
  value: string;
  onChange: (itemValue: string) => void;
}

interface TotalWeightBoxProps {
  label: string;
  weight: number;
  unit: string;
}

interface IgnoreItemCheckboxProps {
  itemId: string;
  isChecked: boolean;
  handleCheckboxChange: (itemId: string) => void;
}

interface ErrorMessageProps {
  message: string;
}

interface CategoryRowProps {
  category: string;
}

interface TitleRowProps {
  title: string;
}

interface MenuItems{
  label: string,
  onSelect: () => void,
}

const TitleRow = ({ title }: TitleRowProps) => {
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

const CategoryRow = ({ category }: CategoryRowProps) => {
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

const IgnoreItemCheckbox = ({
  itemId,
  isChecked,
  handleCheckboxChange,
}: IgnoreItemCheckboxProps) => (
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

const menuItem : MenuItems[] = [
  { label: 'kg', onSelect:() => onChange('kg') },
  { label: 'g', onSelect: () => onChange('g') },
  {label:'lb', onSelect:() => onChange('lb')},
  {label:'oz', onSelect:() => onChange('oz')}
]

const WeightUnitDropdown = ({ value, onChange }: WeightUnitDropdownProps) => {
  return (
    Platform.OS === 'web' ? (
      <DropdownComponent
      value={value}
      accessibilityLabel="Select weight unit"
      placeholder="Select weight unit"
      onValueChange={(itemValue) => onChange(itemValue)}
      data={['kg', 'g', 'lb', 'oz']}
    />
    ) : (
      <RContextMenu
              menuItems={menuItem}
              menuName={
                <RButton>Select weight unit</RButton>
              }
            />
    )
    
  );
};

const TotalWeightBox = ({ label, weight, unit }: TotalWeightBoxProps) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <View style={styles.totalWeightBox}>
      <RText>{label}</RText>
      <RText>{`${formatNumber(weight)} (${unit})`}</RText>
    </View>
  );
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <RStack>
    <RText>{message}</RText>
  </RStack>
);

export {
  WeightUnitDropdown,
  TotalWeightBox,
  IgnoreItemCheckbox,
  ErrorMessage,
  CategoryRow,
  TitleRow,
};
