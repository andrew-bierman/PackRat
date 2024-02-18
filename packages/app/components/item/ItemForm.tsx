import React from 'react';
import {
  RText,
  RStack,
  CustomForm,
  CustomInput,
  SubmitButton,
  CustomSelect,
  CustomRadioGroup,
  useAppFormContext,
} from '@packrat/ui';
import { View } from 'react-native';

import { ItemCategoryEnum } from '../../constants/itemCategory';
import useTheme from '../../hooks/useTheme';
import { type Item } from '@packrat/validations';

const data = ['lb', 'oz', 'kg', 'g'].map((key) => ({ label: key, value: key }));

interface ItemFormProps {
  handleSubmit: (data: Item) => void;
  showSubmitButton?: boolean;
  isLoading: boolean;
  isEdit: boolean;
  defaultValues: Partial<Item>;
  validationSchema: any;
  currentPack: {
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

  const radioOptions = Object.values(ItemCategoryEnum)
    .filter((value) => !(hasWaterAdded && value === ItemCategoryEnum.WATER))
    .map((radioOption) => ({ label: radioOption, value: radioOption }));

  return (
    <View>
      <CustomForm
        validationSchema={validationSchema}
        defaultValues={defaultValues}
      >
        <RStack style={{ gap: 8 }}>
          <CustomInput
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
              <CustomInput name="weight" placeholder="Weight" />
            </View>
            {data && (
              <CustomSelect
                options={data}
                name="unit"
                onValueChange={console.log}
                placeholder={'Unit'}
                width="100"
              />
            )}
          </View>
          <CustomInput
            name="quantity"
            placeholder="Quantity"
            style={{ width: '100%' }}
          />
          <CustomRadioGroup name="type" options={radioOptions} />

          {showSubmitButton && (
            <SubmitButton onSubmit={handleSubmit}>
              <RText style={{ color: currentTheme.colors.text }}>
                {isLoading
                  ? 'Loading..'
                  : isEdit == true
                    ? 'Edit item'
                    : 'Add Item'}
              </RText>
            </SubmitButton>
          )}
        </RStack>
        <Test />
      </CustomForm>
    </View>
  );
};

function Test() {
  console.log(useAppFormContext().formState.errors);
  return null;
}
