import { Box, Input, Button, Text, VStack, Radio } from 'native-base';
import { DropdownComponent } from '../Dropdown';
import { theme } from '../../theme';
import { ItemCategoryEnum } from '../../constants/itemCategory';
import useTheme from '../../hooks/useTheme';
import { ReusableForm } from '../../packrat-ui';
import {
  editItem as editItemValidations,
  addItem as addItemValidations,
} from '@packrat/packages';
import { useSelector } from 'react-redux';
const data = ['lb', 'oz', 'kg', 'g'];

export const ItemForm = ({
  name,
  weight,
  quantity,
  unit,
  categoryType,
  handleSubmit,
  showSubmitButton = true,
  isLoading,
  isEdit,
  currentPack,
  packId,
  _id,
}) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const schema = isEdit ? editItemValidations : addItemValidations;
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
  return (
    <Box>
      <ReusableForm
        fields={[
          { name: 'name', label: 'Item Name', type: 'text' },
          {
            name: 'weight',
            label: 'Weight',
            type: 'text',
          },
          {
            name: 'quantity',
            label: 'Quantity',
            type: 'text',
          },
          {
            name: 'unit',
            label: 'Unit',
            inputComponent: 'select',
            items: data,
          },
          {
            name: 'type',
            label: 'Category',
            inputComponent: 'radio',
            items: Object.values(ItemCategoryEnum),
            accessibilityLabel: 'category for the type of item',
            hasWaterAdded: hasWaterAdded,
          },
        ]}
        defaultValues={{
          name,
          weight,
          unit: unit ? unit : data[2],
          type: categoryType ? categoryType : 'Water',
          quantity,
          packId,
          userId,
          _id,
          ownerId: userId,
        }}
        schema={schema}
        submitText={
          isLoading ? 'Loading..' : isEdit == true ? 'Edit item' : 'Add Item'
        }
        onSubmit={showSubmitButton ? handleSubmit : null}
      />
    </Box>
  );
};
