import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';
import { useEditPackItem } from 'app/hooks/packs/useEditPackItem';

interface AddItemProps {
  _id: string;
  isEdit: boolean;
  initialData: {
    global: string;
    _id: string;
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
  closeModalHandler,
  isItemPage,
  setIsAddItemModalOpen = () => {},
}: AddItemProps) => {
  // Moved the state up to the parent component
  const [name, setName] = useState(initialData?.name || '');
  const [weight, setWeight] = useState(initialData?.weight?.toString() || '');
  const [quantity, setQuantity] = useState(
    initialData?.quantity?.toString() || '',
  );
  const [categoryType, setCategoryType] = useState(
    initialData?.category?.name || '',
  );

  const [unit, setUnit] = useState(initialData?.unit || '');

  const ownerId = useSelector((state) => state.auth.user.id);

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

  // handle updates to initialData
  useEffect(() => {
    setName(initialData?.name || '');
    setWeight(initialData?.weight?.toString() || '');
    setQuantity(initialData?.quantity?.toString() || '');
    setUnit(initialData?.unit || '');
  }, [initialData]);

  const handleSubmit = () => {
    const PackId = packId || initialData.id;

    if (isEdit) {
      if (PackId && initialData.global) {
        editPackItem({
          name,
          weight,
          quantity,
          unit,
          type: categoryType,
          id: initialData.id,
        });
        closeModalHandler();
      } else {
        editPackItem({
          name,
          weight,
          quantity,
          unit,
          type: categoryType,
          id,
          // packId,
        });
        setPage(1);
        closeModalHandler();
      }
    } else {
      addPackItem({
        name,
        weight,
        quantity,
        type: categoryType,
        unit,
        packId,
        ownerId,
      });
    }
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
