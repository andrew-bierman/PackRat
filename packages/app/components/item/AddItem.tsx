import { View } from 'react-native';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';
import { useEditPackItem } from 'app/hooks/packs/useEditPackItem';
import {
  addItemFormSchema,
  editItemFormSchema,
  type Item,
} from '@packrat/validations';
import { useMemo } from 'react';
import { useAuthUser } from 'app/auth/hooks';

interface AddItemProps {
  id: string;
  isEdit: boolean;
  initialData: {
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
  currentPack: any;
  editAsDuplicate: any;
  setPage: (page: number) => void;
  page: number;
  isItemPage: boolean;
  closeModalHandler: () => void;
  setIsAddItemModalOpen: (isOpen: boolean) => void;
}

export const AddItem = ({
  id,
  isEdit,
  initialData,
  packId,
  currentPack,
  editAsDuplicate,
  setPage = (page: number) => {}, // temp fix, need props type
  page,
  closeModalHandler = () => {},
  isItemPage,
  setIsAddItemModalOpen = () => {},
}: AddItemProps) => {
  const {
    // mutation: addPackItemMutation
    isLoading,
    isError,
    addPackItem,
  } = useAddPackItem();

  const user = useAuthUser();
  const ownerId = user?.id;

  const {
    // mutation: addPackItemMutation

    editPackItem,
  } = useEditPackItem(isItemPage);

  const handleSubmit = (data: Item) => {
    if (isEdit) {
      console.log({ data });
      editPackItem({
        ...data,
        id: initialData.id,
        weight: Number(data.weight),
        quantity: Number(data.quantity),
      });
    } else {
      addPackItem({
        ...data,
        packId,
        ownerId,
        weight: Number(data.weight),
        quantity: Number(data.quantity),
      });
    }

    closeModalHandler();
  };

  const defaultValues = useMemo(() => {
    if (!initialData) {
      return { unit: 'lb' };
    }
    const result = {
      name: initialData.name || '',
      weight: String(initialData.weight),
      quantity: String(initialData.quantity),
      type: initialData.category?.name,
      unit: initialData.unit,
      id: undefined,
    };

    if (isEdit) {
      result.id = initialData.id;

      return result;
    }

    return { ...result, packId };
  }, [initialData, isEdit, packId]);

  console.log({ defaultValues });

  return (
    <View>
      <ItemForm
        validationSchema={isEdit ? editItemFormSchema : addItemFormSchema}
        handleSubmit={handleSubmit}
        defaultValues={defaultValues}
        isLoading={isLoading}
        isEdit={isEdit}
        currentPack={currentPack}
      />
    </View>
  );
};
