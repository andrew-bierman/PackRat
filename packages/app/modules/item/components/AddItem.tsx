import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useAddPackItem, useEditPackItem } from 'app/modules/pack';
import {
  addItem as addItemSchema,
  editItem as editItemSchema,
  type Item,
} from '@packrat/validations';
import { useAuthUser } from 'app/modules/auth';
import { convertWeighToSmallestUnit } from '../utils';
import { type ItemUnit } from '../model';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from '../constants';
import { useItemWeightUnit } from '../hooks';

interface AddItemProps {
  id?: string;
  isEdit?: boolean;
  initialData?: {
    global: string;
    id: string;
    name?: string;
    weight?: number;
    quantity?: number;
    category?: {
      name: string;
    };
    unit?: string;
  };
  packId: string;
  currentPack?: any;
  editAsDuplicate?: any;
  setPage?: (page: number) => void;
  page?: number;
  isItemPage?: boolean;
  closeModalHandler?: () => void;
  setIsAddItemModalOpen?: (isOpen: boolean) => void;
  setRefetch?: () => void;
}

export const AddItem = ({
  isEdit,
  initialData,
  packId,
  currentPack,
  closeModalHandler,
  isItemPage,
}: AddItemProps) => {
  // const [currPackId] = usePackId();

  const user = useAuthUser();

  const ownerId = user?.id;

  const { isLoading, addPackItem } = useAddPackItem();
  const [userPreferUnit] = useItemWeightUnit();
  const { editPackItem } = useEditPackItem(isItemPage);

  const handleSubmit = (data: Item) => {
    if (isEdit) {
      editPackItem(data as any);
    } else {
      addPackItem(data);
    }
    if (closeModalHandler) closeModalHandler();
  };

  const defaultValues = useMemo(() => {
    if (!initialData) {
      return { unit: userPreferUnit, ownerId, packId };
    }
    const result = {
      id: '',
      ownerId,
      name: initialData.name || '',
      weight: initialData.unit
        ? convertWeight(
            initialData.weight,
            SMALLEST_ITEM_UNIT,
            initialData.unit,
          )
        : undefined,
      quantity: initialData.quantity,
      type: initialData.category?.name,
      unit: initialData.unit,
      packId,
    };

    if (isEdit) {
      result.id = initialData.id;

      return result;
    }

    return result;
  }, [initialData, isEdit, packId, ownerId, userPreferUnit]);

  return (
    <View>
      <ItemForm
        validationSchema={isEdit ? editItemSchema : addItemSchema}
        handleSubmit={handleSubmit}
        defaultValues={defaultValues}
        isLoading={isLoading}
        isEdit={isEdit}
        currentPack={currentPack}
      />
    </View>
  );
};
