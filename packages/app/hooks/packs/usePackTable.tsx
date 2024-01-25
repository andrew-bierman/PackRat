import { useDispatch } from 'react-redux';
import { useSelector } from '../redux/useSelector';
import { useState } from 'react';
import { duplicatePackItem } from 'app/store/packsStore';
import { ItemCategoryEnum } from 'app/constants/itemCategory';
import { convertWeight } from 'app/utils/convertWeight';

export const usePackTable = ({
  currentPack,
  selectedPack,
  refetch,
  setRefetch,
  copy,
}) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let ids = [];
  if (currentPack?.items) {
    ids = copy ? currentPack.items.map((item) => item.id) : [];
  }
  const [checkedItems, setCheckedItems] = useState([...ids]);

  const handleDuplicate = () => {
    const data = {
      packId: currentPack.id,
      ownerId: user.id,
      items: checkedItems,
    };
    dispatch(duplicatePackItem(data));
  };

  const [weightUnit, setWeightUnit] = useState('g');
  const isLoading = useSelector((state: any) => state.packs.isLoading);

  const error = useSelector((state: any) => state.items.error);
  const data = currentPack?.items;
  let totalFoodWeight = 0;
  let totalWaterWeight = 0;
  let totalBaseWeight = 0;

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
    ?.reduce((acc, item) => {
      const categoryName = item.category ? item.category.name : 'Undefined';
      (acc[categoryName] = acc[categoryName] || []).push(item);
      return acc;
    }, {});

  return {
    user,
    dispatch,
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
