import { useState } from 'react';
import { ItemCategoryEnum } from 'app/constants/itemCategory';
import { convertWeight } from 'app/utils/convertWeight';
import { useAuthUser } from 'app/auth/hooks';
import { useDuplicatePackItem } from './useDuplicatePackItem';

type WeightUnit = 'g' | 'kg' | 'oz' | 'lb' | 'lbs';

export const usePackTable = ({
  currentPack,
  selectedPack,
  refetch,
  setRefetch,
  copy,
}) => {
  const user = useAuthUser();
  const duplicatePackItem = useDuplicatePackItem();
  let ids = [];
  if (currentPack?.items) {
    ids = copy ? currentPack.map((item) => item.id) : [];
  }

  const [checkedItems, setCheckedItems] = useState([...ids]);

  const handleDuplicate = () => {
    const data = {
      packId: currentPack.id,
      ownerId: user.id,
      items: checkedItems,
    };

    duplicatePackItem(data);
  };

  const [weightUnit, setWeightUnit] = useState<WeightUnit>('g');
  const data = currentPack?.items;
  let totalFoodWeight = 0;
  let totalWaterWeight = 0;
  let totalBaseWeight = 0;
  const isLoading = !data;
  const error = false;

  let waterItem;
  const foodItems = [];
  // for calculating the total.
  /*
      Todo better to move this all inside a utility function and pass them variables
      */
  data
    ?.filter((item) => !checkedItems.includes(item.id))
    .forEach((item) => {
      const categoryName = item.category ? item.category.name : 'Undefined';
      const itemWeight = Number(item.weight) || 0; // ensure it's a number
      const itemQuantity = Number(item.quantity) || 0; // ensure it's a number
      const itemUnit = item.unit || null;
      if (!copy) {
        switch (categoryName) {
          case ItemCategoryEnum.ESSENTIALS: {
            totalBaseWeight += convertWeight(
              itemWeight * itemQuantity,
              itemUnit,
              weightUnit,
            );
            break;
          }
          case ItemCategoryEnum.FOOD: {
            totalFoodWeight += convertWeight(
              itemWeight * itemQuantity,
              itemUnit,
              weightUnit,
            );
            foodItems.push(item);
            break;
          }
          case ItemCategoryEnum.WATER: {
            totalWaterWeight += convertWeight(
              itemWeight * itemQuantity,
              itemUnit,
              weightUnit,
            );
            waterItem = item;
            break;
          }
        }
      }
    });

  const totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  // In your groupedData definition, provide a default category for items without one
  const groupedData = data
    ?.filter((fItem) => !Array.isArray(fItem.category))
    ?.reduce((acc, fItem) => {
      const categoryName = fItem.category ? fItem.category.name : 'Undefined';
      (acc[categoryName] = acc[categoryName] || []).push(fItem);
      return acc;
    }, {});

  return {
    user,
    ids,
    checkedItems,
    setCheckedItems,
    handleDuplicate,
    weightUnit,
    setWeightUnit,
    isLoading,
    error,
    data,
    totalFoodWeight,
    totalWaterWeight,
    totalBaseWeight,
    waterItem,
    foodItems,
    totalWeight,
    handleCheckboxChange,
    groupedData,
  };
};
