import { ItemCategoryEnum } from 'app/modules/item';
import { SMALLEST_ITEM_UNIT } from 'app/modules/item/constants';
import { convertWeight, type WeightUnit } from 'app/utils/convertWeight';
export const usePackSummary = (packItems: any, weightUnit: WeightUnit) => {
  let totalFoodWeight = 0;
  let totalWaterWeight = 0;
  let totalBaseWeight = 0;

  packItems?.forEach?.((item) => {
    const categoryName = item.category?.name || 'Undefined';
    const itemWeight = Number(item.weight) || 0;
    const itemQuantity = Number(item.quantity) || 0;

    switch (categoryName) {
      case ItemCategoryEnum.ESSENTIALS: {
        totalBaseWeight += convertWeight(
          itemWeight * itemQuantity,
          SMALLEST_ITEM_UNIT,
          weightUnit,
        );
        break;
      }
      case ItemCategoryEnum.FOOD: {
        totalFoodWeight += convertWeight(
          itemWeight * itemQuantity,
          SMALLEST_ITEM_UNIT,
          weightUnit,
        );
        break;
      }
      case ItemCategoryEnum.WATER: {
        totalWaterWeight += convertWeight(
          itemWeight * itemQuantity,
          SMALLEST_ITEM_UNIT,
          weightUnit,
        );
        break;
      }
    }
  });

  const totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  return {
    totalBaseWeight,
    totalFoodWeight,
    totalWaterWeight,
    totalWeight,
  };
};
