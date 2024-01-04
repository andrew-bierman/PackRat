import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useAddPackItem } from '~/hooks/packs/useAddPackItem';
import { useEditPackItem } from '~/hooks/packs/useEditPackItem';

export const AddItem = ({
  _id,
  isEdit,
  initialData,
  packId,
  currentPack,
  editAsDuplicate,
  setPage = () => {},
  page,
  closeModalHandler,
  setIsAddItemModalOpen = () => {},
}) => {

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

  const {
    // mutation: addPackItemMutation
    isLoading,
    isError,
    addPackItem,
  } = useAddPackItem();

  const {
    // mutation: addPackItemMutation
   
    editPackItem,
  } = useEditPackItem();

  // handle updates to initialData
  useEffect(() => {
    setName(initialData?.name || '');
    setWeight(initialData?.weight?.toString() || '');
    setQuantity(initialData?.quantity?.toString() || '');
    setUnit(initialData?.unit || '');
  }, [initialData]);

  /**
   * Generate the function comment for the given function body in a markdown code block with the correct language syntax.
   *
   * @return {type} description of return value
   */
  const handleSubmit = () => {
    const PackId = packId || initialData._id;

    if (isEdit) {
      if (PackId && initialData.global) {
        editPackItem({
          name,
          weight,
          quantity,
          unit,
          type: categoryType,
          // _id: initialData._id,
        });
        closeModalHandler();
      } else {
        editPackItem({
          name,
          weight,
          quantity,
          unit,
          type: categoryType,
          // _id,
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
        packId
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
