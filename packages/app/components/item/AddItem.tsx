import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';
import { useEditPackItem } from 'app/hooks/packs/useEditPackItem';
import useAddItem from 'app/hooks/item/useAddItem';

export const AddItem = ({
  // _id,
  isEdit,
  initialData,
  packId,
  currentPack,
  // editAsDuplicate,
  setPage = (page: number) => {},
  // page,
  closeModalHandler,
  // setIsAddItemModalOpen = () => {},
}) => {
  const {
    name,
    setName,
    weight,
    setWeight,
    quantity,
    setQuantity,
    categoryType,
    setCategoryType,
    unit,
    setUnit,
    handleSubmit,
    isLoading,
  } = useAddItem({
    isEdit,
    initialData,
    packId,
    setPage,
    closeModalHandler,
  });

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
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEdit={isEdit}
        categoryType={categoryType}
        setCategoryType={setCategoryType}
        currentPack={currentPack}
      />
    </View>
  );
};
