import { ItemCategoryEnum } from '../../constants/itemCategory';
const data = ['lb', 'oz', 'kg', 'g'];

const useItemForm = ({ currentPack }) => {
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

  const radioOptions = Object.values(ItemCategoryEnum).filter(
    (value) => !(hasWaterAdded && value === ItemCategoryEnum.WATER),
  );

  return { radioOptions };
};

export default useItemForm;
