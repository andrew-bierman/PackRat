import React, { useState } from 'react';
import {
  RText,
  RStack,
  Form as OriginalForm,
  FormInput,
  SubmitButton,
  FormSelect as OriginalFormSelect,
  FormRadioGroup as OriginalFormRadioGroup,
  DropdownComponent,
} from '@packrat/ui';
import { Platform, View } from 'react-native';

import { ItemCategoryEnum } from '../../constants/itemCategory';
import useTheme from '../../hooks/useTheme';
import { type Item } from '@packrat/validations';

const Form: any = OriginalForm;
const FormSelect: any = OriginalFormSelect;
const FormRadioGroup: any = OriginalFormRadioGroup;

const data = ['lb', 'oz', 'kg', 'g'].map((key) => ({ label: key, value: key }));

interface ItemFormProps {
  handleSubmit: (data: Item) => void;
  showSubmitButton?: boolean;
  isLoading: boolean;
  isEdit?: boolean;
  defaultValues: Partial<Item>;
  validationSchema: any;
  currentPack?: {
    items: Array<{
      category: {
        name: string;
      };
    }>;
  } | null;
}

export const ItemForm = ({
  handleSubmit,
  showSubmitButton = true,
  isLoading,
  isEdit,
  defaultValues,
  validationSchema,
  currentPack,
}: ItemFormProps) => {
  let hasWaterAdded = false;
  if (
    currentPack &&
    Array.isArray(currentPack.items) &&
    currentPack.items.length > 0
  ) {
    hasWaterAdded = currentPack.items.some(
      (item) => item.category && item.category.name === ItemCategoryEnum.WATER,
    );
  }
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [selectedUnit, setSelectedUnit] = useState('lb');

  const radioOptions = Object.values(ItemCategoryEnum)
    .filter((value) => !(hasWaterAdded && value === ItemCategoryEnum.WATER))
    .map((radioOption) => ({ label: radioOption, value: radioOption }));

  const handleUnitChange = (i) => {
    console.log(i);
    setSelectedUnit(i);
  };

  return (
    <View>
      <Form
        validationSchema={validationSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <RStack style={{ gap: 8 }}>
          <FormInput
            name="name"
            placeholder="Item Name"
            style={{ width: '100%' }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              gap: 8,
            }}
          >
            <View>
              <FormInput name="weight" placeholder="Weight" isDecimal={true} />
            </View>
            {data &&
              (Platform.OS === 'web' ? (
                <FormSelect
                  options={data}
                  name="unit"
                  placeholder={'Unit'}
                  width="100"
                />
              ) : (
                <View style={{ flex: 1 }}>
                  <DropdownComponent
                    value={selectedUnit}
                    data={data}
                    onValueChange={handleUnitChange}
                    placeholder={selectedUnit}
                    width="50%"
                    native={true}
                    zeego={true}
                  />
                </View>
              ))}
          </View>
          <FormInput
            name="quantity"
            placeholder="Quantity"
            isNumeric
            style={{ width: '100%' }}
          />
          <FormRadioGroup name="type" options={radioOptions} />

          {showSubmitButton && (
            <SubmitButton onSubmit={handleSubmit}>
              <RText style={{ color: currentTheme.colors.text }}>
                {isLoading ? 'Loading..' : isEdit ? 'Edit item' : 'Add Item'}
              </RText>
            </SubmitButton>
          )}
        </RStack>
      </Form>
    </View>
  );
};
