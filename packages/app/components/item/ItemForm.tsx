import { RInput, RButton, RText, RStack, RRadio } from '@packrat/ui';
import { View } from 'react-native';
import { DropdownComponent } from '../Dropdown';
// import { theme } from '../../theme';
// import { ItemCategoryEnum } from '../../constants/itemCategory';
import useTheme from '../../hooks/useTheme';
import useItemForm from 'hooks/item/useItemForm';
const data = ['lb', 'oz', 'kg', 'g'];

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
}) => {
  const {
    /* enableDarkMode, enableLightMode, isDark, isLight, */ currentTheme,
  } = useTheme();
  const { radioOptions } = useItemForm({ currentPack });

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
            onChangeText={(text) => setWeight(text)}
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
          onChangeText={(text) => setQuantity(text)}
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
