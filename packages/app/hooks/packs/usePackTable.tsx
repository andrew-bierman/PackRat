import { useState } from 'react';
import { ItemCategoryEnum } from 'app/constants/itemCategory';
import { convertWeight } from 'app/utils/convertWeight';
import { useAuthUser } from 'app/auth/hooks';
import { useDuplicatePackItem } from './useDuplicatePackItem';
import { useItemWeightUnit } from 'app/hooks/items';

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

  const [checkedItems, setCheckedItems] = useState<string[]>([...ids]);
  const [weightUnit, setWeightUnit] = useItemWeightUnit();

  const handleDuplicate = () => {
    if (user) {
      const data = {
        packId: currentPack.id,
        ownerId: user.id,
        items: checkedItems,
      };
    }

    duplicatePackItem(data);
  };

  const data = currentPack?.items;
  let totalFoodWeight = 0;
  let totalWaterWeight = 0;
  let totalBaseWeight = 0;
  const isLoading = !data;
  const error = false;

  let waterItem;
  // const foodItems = [];
  const foodItems: {
    id: string;
    category?: { name: string };
    weight?: number;
    quantity?: number;
    unit?: string;
  }[] = [];
  // for calculating the total.
  /*
      Todo better to move this all inside a utility function and pass them variables
      */
  data
    ?.filter(
      (item: {
        id: string;
        category?: { name: string };
        weight?: number;
        quantity?: number;
        unit?: string;
      }) => !checkedItems.includes(item.id),
    )
    .forEach(
      (item: {
        id: string;
        category?: { name: string };
        weight?: number;
        quantity?: number;
        unit?: string;
      }) => {
        const categoryName = item.category ? item.category.name : 'Undefined';
        const itemWeight = Number(item.weight) || 0; // ensure it's a number
        const itemQuantity = Number(item.quantity) || 0; // ensure it's a number
        const itemUnit = item.unit || null;
        if (!copy) {
          switch (categoryName) {
            case ItemCategoryEnum.ESSENTIALS: {
              totalBaseWeight += convertWeight(
                itemWeight * itemQuantity,
                itemUnit as any,
                weightUnit,
              );
              break;
            }
            case ItemCategoryEnum.FOOD: {
              totalFoodWeight += convertWeight(
                itemWeight * itemQuantity,
                itemUnit as any,
                weightUnit,
              );
              foodItems.push(item);
              break;
            }
            case ItemCategoryEnum.WATER: {
              totalWaterWeight += convertWeight(
                itemWeight * itemQuantity,
                itemUnit as any,
                weightUnit,
              );
              waterItem = item;
              break;
            }
          }
        }
      },
    );

  const totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  const handleCheckboxChange = (itemId: string) => {
    setCheckedItems((prev: string[]) =>
      prev.includes(itemId)
        ? prev.filter((id: string) => id !== itemId)
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
