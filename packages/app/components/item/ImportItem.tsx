import { View } from 'react-native';
import { ImportForm } from './ImportForm';
import { useImportPackItem } from 'app/hooks/packs/useImportPackItem';
import { useEditPackItem } from 'app/hooks/packs/useEditPackItem';
import {
  addItem as addItemSchema,
  editItem as editItemSchema,
  type Item,
} from '@packrat/validations';
import { useAuthUser } from 'app/auth/hooks';

interface ImportItemProps {
  id?: string;
  isEdit?: boolean;
  initialData?: {
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
  currentPack?: any;
  editAsDuplicate?: any;
  setPage?: (page: number) => void;
  page?: number;
  isItemPage?: boolean;
  closeModalHandler?: () => void;
  setIsImportItemModalOpen?: (isOpen: boolean) => void;
  setRefetch?: () => void;
}

type ImportItem = Omit<Item, 'id'> & { id: string };

export const ImportItem = ({
  isEdit,
  currentPack,
  closeModalHandler,
  isItemPage,
}: ImportItemProps) => {
  const user = useAuthUser();

  const { isLoading, isError, importPackItem } = useImportPackItem();
  const { editPackItem } = useEditPackItem(isItemPage);

  const handleSubmit = (data: Item) => {
    if (isEdit) {
      editPackItem(data as any);
    } else {
      importPackItem(data);
    }
    if (closeModalHandler) closeModalHandler();
  };

  return (
    <View>
      <ImportForm
        validationSchema={isEdit ? editItemSchema : addItemSchema}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEdit={isEdit}
        currentPack={currentPack}
      />
    </View>
  );
};
