import { useState } from 'react';
import { useAuthUser } from 'app/modules/auth';
import { useDuplicatePackItem } from '../../hooks/useDuplicatePackItem';
import { useItemWeightUnit } from 'app/modules/item';

interface UsePackTableProps {
  currentPack: any;
  selectedPack?: any;
  refetch?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  copy?: boolean;
}

export const usePackTable = ({ currentPack, copy }: UsePackTableProps) => {
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
    waterItem,
    foodItems,
    handleCheckboxChange,
    groupedData,
  };
};
