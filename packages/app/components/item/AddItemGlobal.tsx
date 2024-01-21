import { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsGlobal, addItemOffline } from '../../store/globalItemsStore';
import { addOfflineRequest } from '../../store/offlineQueue';
import { queryTrpc } from '../../trpc';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useModal } from '@packrat/ui/src/modal';
import useAddItemGlobal from 'app/hooks/item/useAddItemGlobal';

export const AddItemGlobal = () => {
  const {
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
    isLoading,
  } = useAddItemGlobal();

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
