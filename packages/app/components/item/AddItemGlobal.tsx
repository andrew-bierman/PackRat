import { useContext, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsGlobal, addItemOffline } from '../../store/globalItemsStore';
import { addOfflineRequest } from '../../store/offlineQueue';
import { queryTrpc } from '../../trpc';
import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useModal } from '@packrat/ui/src/modal';
interface Item {
  name: string;
  weight: string;
  quantity: string;
  type: string;
  unit: string;
}
export const AddItemGlobal = () => {
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
  const resetAddForm = () => {
    setName('');
    setCategoryType('');
    setWeight('');
    setQuantity('');
    setUnit('');
  };

  // handle updates to initialData

  /**
   * Handles the form submission.
   *
   * @return {void}
   */
  const handleSubmit = () => {
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
        categoryType={categoryType}
        setCategoryType={setCategoryType}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </View>
  );
};
