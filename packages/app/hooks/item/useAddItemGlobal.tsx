import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsGlobal, addItemOffline } from '../../store/globalItemsStore';
import { addOfflineRequest } from '../../store/offlineQueue';
import { queryTrpc } from '../../trpc';
import { useModal } from '@packrat/ui/src/modal';

const useAddItemGlobal = () => {
  const utils = queryTrpc.useContext();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.items.isLoading);
  const { isConnected } = useSelector((state) => state.offlineQueue);

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const [categoryType, setCategoryType] = useState('');
  const { setIsModalOpen } = useModal();

  /**
   * Resets the add form by setting all the input values to an empty string.
   */
  const resetAddForm = useCallback(() => {
    setName('');
    setCategoryType('');
    setWeight('');
    setQuantity('');
    setUnit('');
  }, []);

  // handle updates to initialData

  /**
   * Handles the form submission.
   *
   * @return {void}
   */
  const handleSubmit = useCallback(() => {
    if (!isConnected) {
      const item = { name, weight, quantity, type: categoryType, unit };
      dispatch(addItemOffline({ ...item, weight: Number(item.weight) }));
      dispatch(addOfflineRequest({ method: 'addGlobalItem', data: item }));
    } else {
      dispatch(
        addItemsGlobal({
          name,
          weight,
          quantity,
          type: categoryType,
          unit,
        }),
      );
    }

    resetAddForm();
    setIsModalOpen(false);
    if (utils.getItemsGlobally) {
      utils.getItemsGlobally.invalidate();
    }
  }, [
    categoryType,
    dispatch,
    isConnected,
    name,
    quantity,
    resetAddForm,
    setIsModalOpen,
    unit,
    utils.getItemsGlobally,
    weight,
  ]);

  return {
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
  };
};

export default useAddItemGlobal;
