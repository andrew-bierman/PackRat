import { View } from 'react-native';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';
import { useEditPackItem } from 'app/hooks/packs/useEditPackItem';
import { usePackId } from 'app/hooks/packs/usePackId';
import {
  addItem as addItemSchema,
  editItem as editItemSchema,
  type Item,
} from '@packrat/validations';
import { useMemo } from 'react';

interface AddItemProps {
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
  isEdit,
  initialData,
  packId,
  currentPack,
  editAsDuplicate,
  setPage = (page: number) => {}, // temp fix, need props type
  page,
  closeModalHandler,
  isItemPage,
  setIsAddItemModalOpen = () => {},
}: AddItemProps) => {

  const [currPackId] = usePackId();

  const ownerId = user?.id;

  const {
    // mutation: addPackItemMutation
    isLoading,
    isError,
    addPackItem,
  } = useAddPackItem();
  const {
    // mutation: addPackItemMutation

    editPackItem,
  } = useEditPackItem(isItemPage);

  const handleSubmit = (data: Item) => {
    if (isEdit) {
      editPackItem({
        ...data,
        packId: currPackId
      });
    } else {
      addPackItem(data);
    }
    if (closeModalHandler)
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
      id: packId,
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
        validationSchema={isEdit ? editItemSchema : addItemSchema}
        handleSubmit={handleSubmit}
        defaultValues={defaultValues}
        isLoading={isLoading}
        isEdit={isEdit}
        currentPack={currentPack}
        packId={packId}
      />
    </View>
  );
};
