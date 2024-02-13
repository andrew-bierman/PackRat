import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useModal } from '@packrat/ui';
import { useAddItem, useItems } from 'app/hooks/items';
import { usePagination } from 'app/hooks/common';

export const AddItemGlobal = () => {
  const { limit, page } = usePagination();
  const { isLoading } = useItems({ limit, page });

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('lb');

  const [categoryType, setCategoryType] = useState('');
  const { setIsModalOpen } = useModal();

  const { handleAddNewItem } = useAddItem();

  /**
   * Resets the add form by setting all the input values to an empty string.
   */
  const resetAddForm = () => {
    setName('');
    setCategoryType('');
    setWeight('');
    setQuantity('');
    setUnit('');
  };

  const handleSubmit = () => {
    handleAddNewItem(
      {
        name,
        weight,
        quantity,
        type: categoryType,
        unit,
      },
      () => {
        setIsModalOpen(false);
        resetAddForm();
      },
    );
  };

  return (
    <View>
      <ItemForm
        name={name}
        setName={setName}
        weight={weight}
        setWeight={setWeight}
        quantity={quantity}
        setQuantity={setQuantity}
        unit={unit}
        setUnit={setUnit}
        categoryType={categoryType}
        setCategoryType={setCategoryType}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </View>
  );
};
