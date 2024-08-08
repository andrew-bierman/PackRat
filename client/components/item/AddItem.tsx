import { useEffect, useState } from 'react';
import { Box, Input, Button, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPackItem,
  editPackItem,
  editItemsGlobalAsDuplicate,
} from '../../store/packsStore';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { ItemCategoryEnum } from '../../constants/itemCategory';

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

        dispatch(
          editItemsGlobalAsDuplicate({
            itemId: _id,
            packId,
            name,
            weight,
            quantity,
            unit,
            type: categoryType,
          }),
        );
        closeModalHandler();
      } else {
        dispatch(
          editPackItem({
            name,
            weight,
            quantity,
            unit,
            type: categoryType,
            _id: initialData._id,
          }),
        );
        setPage(1);
        closeModalHandler();
        setRefetch(refetch !== true);
      }
    } else {
      dispatch(
        addPackItem({
          name,
          weight,
          quantity,
          type: categoryType,
          unit,
          _id,
          packId,
        }),
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
