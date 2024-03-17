import { View } from 'react-native';

import { ItemForm } from './ItemForm'; // assuming you moved the form related code to a separate component
import { useModal } from '@packrat/ui';
import { useAddItem, useItems } from 'app/hooks/items';
import { usePagination } from 'app/hooks/common';
import {
  addItemGlobal as addItemSchema,
  type Item,
} from '@packrat/validations';
export const AddItemGlobal = () => {
  const { limit, page } = usePagination();
  const { isLoading } = useItems({ limit, page });

  const { setIsModalOpen } = useModal();

  const { handleAddNewItem } = useAddItem();

  const handleSubmit = (data: Item) => {
    console.log({ data });
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
        defaultValues={{ unit: 'lb' }}
      />
    </View>
  );
};
