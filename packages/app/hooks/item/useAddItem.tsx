import { useCallback, useEffect, useState } from 'react';
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';
import { useEditPackItem } from 'app/hooks/packs/useEditPackItem';

const useAddItem = ({
  isEdit,
  initialData,
  packId,
  setPage = (page: number) => {},
  closeModalHandler,
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
  const handleSubmit = useCallback(() => {
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
        packId,
      });
    }
  }, [name, weight, quantity, unit, categoryType]);

  return {
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
  };
};

export default useAddItem;
