import { RInput, RButton, RText, RStack, RRadio } from '@packrat/ui';
import { View } from 'react-native';
import { DropdownComponent } from '../Dropdown';
import { theme } from '../../theme';
import { ItemCategoryEnum } from '../../constants/itemCategory';
import useTheme from '../../hooks/useTheme';
const data = ['lb', 'oz', 'kg', 'g'];

interface ItemFormProps {
  name: string;
  setName: (text: string) => void;
  weight: string;
  setWeight: (text: string) => void;
  quantity: string;
  setQuantity: (text: string) => void;
  unit: string;
  setUnit: (value: string) => void;
  categoryType: string;
  setCategoryType: (value: string) => void;
  handleSubmit: () => void;
  showSubmitButton?: boolean;
  isLoading: boolean;
  isEdit: boolean;
  currentPack: {
    items: Array<{
      category: {
        name: string;
      };
    }>;
  } | null;
}

export const ItemForm = ({
  name,
  setName,
  weight,
  setWeight,
  quantity,
  setQuantity,
  unit,
  setUnit,
  categoryType,
  setCategoryType,
  handleSubmit,
  showSubmitButton = true,
  isLoading,
  isEdit,
  currentPack,
}: ItemFormProps) => {
  let hasWaterAdded = false;
  if (
    currentPack &&
    Array.isArray(currentPack.itemPacks) &&
    currentPack.itemPacks.length > 0
  ) {
    hasWaterAdded = currentPack.itemPacks.some(
      (item) => item.category && item.category.name === ItemCategoryEnum.WATER,
    );
  }
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const radioOptions = Object.values(ItemCategoryEnum).filter(
    (value) => !(hasWaterAdded && value === ItemCategoryEnum.WATER),
  );

  return (
    <View>
      <RStack style={{ gap: 8 }}>
        <RInput
          value={name}
          placeholder="Item Name"
          onChangeText={(text) => setName(text)}
          width="100%"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <RInput
            value={weight}
            placeholder="Weight"
            onChangeText={(text) => setWeight(parseFloat(text))}
            flex={1}
          />
          {data && (
            <DropdownComponent
              data={data}
              value={unit}
              onValueChange={setUnit}
              placeholder={'Unit'}
              width="100"
            />
          )}
        </View>

        <RInput
          value={quantity}
          placeholder="Quantity"
          onChangeText={(text) => setQuantity(parseInt(text))}
          width="100%"
          type="text"
        />
        <RRadio
          value={categoryType}
          name="category"
          accessibilityLabel="category for the type of item"
          onValueChange={(nextVal) => setCategoryType(nextVal)}
          data={radioOptions}
        />

        {showSubmitButton && (
          <RButton onPress={handleSubmit}>
            <RText style={{ color: currentTheme.colors.text }}>
              {isLoading
                ? 'Loading..'
                : isEdit == true
                  ? 'Edit item'
                  : 'Add Item'}
            </RText>
          </RButton>
        )}
      </RStack>
    </View>
  );
};
