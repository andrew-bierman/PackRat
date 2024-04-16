import React from 'react';
import {
  RText,
  RStack,
  Form,
  FormInput,
  SubmitButton,
  FormSelect,
  FormRadioGroup,
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
  packId: number;
}

export const ItemForm = ({
  handleSubmit,
  showSubmitButton = true,
  isLoading,
  isEdit,
  defaultValues,
  validationSchema,
  currentPack,
  packId,
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
              <FormInput name="weight" placeholder="Weight" isNumeric />
            </View>
            {data && (
              <FormSelect
                options={data}
                name="unit"
                onValueChange={console.log}
                placeholder={'Unit'}
                width="100"
              />
            )}
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
                {isLoading
                  ? 'Loading..'
                  : isEdit == true
                    ? 'Edit item'
                    : 'Add Item'}
              </RText>
            </SubmitButton>
          )}
          <FormInput
            name="packId"
            defaultValue={packId}
            style={{ display: 'none' }}
          />
        </RStack>
        <Test />
      </Form>
    </View>
  );
};

function Test() {
  console.log(useAppFormContext().formState.errors);
  return null;
}
