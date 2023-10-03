import { useEffect, useState } from 'react';
import { Box, Input, Button, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { ItemCategoryEnum } from '../../constants/itemCategory';
import { PACKQUERYS, PACKREDUCERS } from '~/hooks/packs';

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
  refetch,
  setIsAddItemModalOpen = () => {},
  setRefetch = () => {},
}) => {
  const dispatch = useDispatch();
  const {
    mutation: editItemsGlobalAsDuplicateMutation,
    onSuccesMutation: editItemsGlobalAsDuplicateOnSuccessMutation,
  } = useMutation(
    PACKQUERYS.editGlobalItemAsDuplicate,
    PACKREDUCERS.editGlobalItemAsDuplicate,
  );

  const {
    mutation: editItemsMutation,
    onSuccesMutation: editItemsOnSuccessMutation,
  } = useMutation(PACKQUERYS.editItem, PACKREDUCERS.editItem);

  const {
    mutation: addPackItemsMutation,
    onSuccesMutation: addPackItemsOnSuccessMutation,
  } = useMutation(PACKQUERYS.addItem, PACKREDUCERS.addItem);

  const isLoading = useSelector((state) => state.packs.isLoading);

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
    console.log('initial', initialData);
    if (isEdit) {
      if (packId && initialData.global) {
        console.log('editing', packId);
        editItemsGlobalAsDuplicateMutation.mutate(
          {
            itemId: _id,
            packId,
            name,
            weight,
            quantity,
            unit,
            type: categoryType,
          },
          {
            onSuccess: (data) =>
              editItemsGlobalAsDuplicateOnSuccessMutation({
                ...data,
                itemId: _id,
                packId: pack._id,
              }),
          },
        );
        closeModalHandler();
      } else {
        editItemsMutation.mutate(
          {
            name,
            weight,
            quantity,
            unit,
            type: categoryType,
            _id: initialData._id,
          },
          {
            onSuccess: (data) => editItemsOnSuccessMutation(data),
          },
        );

        setPage(1);
        closeModalHandler();
        setRefetch(refetch !== true);
      }
    } else {
      addPackItemsMutation.mutate(
        {
          name,
          weight,
          quantity,
          type: categoryType,
          unit,
          _id,
          packId,
        },
        {
          onSuccess: (data) => addPackItemsOnSuccessMutation(data),
        },
      );
      setIsAddItemModalOpen(false);
      setRefetch(refetch !== true);
    }
  };

  return (
    <Box>
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
    </Box>
  );
};
