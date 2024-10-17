import { View } from 'react-native';

import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useModal } from '@packrat/ui';
import { useAddItem, useItems } from '../hooks';
import { usePagination } from 'app/hooks/common';
import {
  addItemGlobal as addItemSchema,
  type Item,
} from '@packrat/validations';
import { useAuthUser } from 'app/modules/auth';

export const AddItemGlobal = () => {
  const { limit, page } = usePagination();
  const { isLoading } = useItems({ limit, page });
  const authUser = useAuthUser();

  if (!authUser) {
    return null; // or some fallback
  }

  const { setIsModalOpen } = useModal();

  const { handleAddNewItem } = useAddItem();

  const handleSubmit = (data: Item) => {
    handleAddNewItem(data, () => {
      setIsModalOpen(false);
    });
  };

  return (
    <View>
      <ItemForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        validationSchema={addItemSchema}
        defaultValues={{ unit: 'lb', ownerId: authUser.id }}
      />
    </View>
  );
};
