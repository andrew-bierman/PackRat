import { Feather as OriginalFeather } from '@expo/vector-icons';
import {
  DropdownComponent,
  RText as OriginalRText,
  RCheckbox,
  RStack,
} from '@packrat/ui';
import { categoryIcons } from 'app/constants/pack/icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';
import { formatNumber } from 'app/utils/formatNumber';
import React from 'react';
import { View } from 'react-native';
import { Row } from 'react-native-table-component';
import loadStyles from './packtable.style';

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
const optionValues = [
  { label: 'kg', value: 'kg' },
  { label: 'g', value: 'g' },
  { label: 'lb', value: 'lb' },
  { label: 'oz', value: 'oz' },
];

const TitleRow = ({ title }: TitleRowProps) => {
  const styles = useCustomStyles(loadStyles);
  const rowData = [
    <RStack style={{ flexDirection: 'row', ...styles.mainTitle }} key="2">
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
    <RStack
      style={{ flexDirection: 'row', gap: 8, ...styles.categoryRow }}
      key="1"
    >
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

const WeightUnitDropdown = ({ value, onChange }: WeightUnitDropdownProps) => {
  const { xxs, xxl, xs } = useResponsive();
  return (
    <View
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '55%',
      }}
    >
      <DropdownComponent
        value={value}
        data={optionValues}
        onValueChange={(itemValue) => onChange(itemValue)}
        placeholder={`Select Weight unit :  ${value}`}
        native={true}
      />
    </View>
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
  CategoryRow,
  ErrorMessage,
  IgnoreItemCheckbox,
  TitleRow,
  TotalWeightBox,
  WeightUnitDropdown,
};
