import { View } from 'react-native';
import { ImportForm } from './ImportForm';
import { type Item } from '@packrat/validations';
import { useAuthUser } from 'app/auth/hooks';

interface ImportItemProps {
  id?: string;
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
  currentPack,
  closeModalHandler,
  isItemPage,
  packId,
}: ImportItemProps) => {
  const user = useAuthUser();
  const ownerId = user?.id;

  return (
    <View>
      <ImportForm
        closeModalHandler={closeModalHandler}
        packId={packId}
        currentPack={currentPack}
        ownerId={ownerId}
      />
    </View>
  );
};
