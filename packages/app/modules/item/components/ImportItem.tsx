import { View } from 'react-native';
import { ImportForm } from './ImportForm';
import { type Item } from '@packrat/validations';
import { useAuthUser } from 'app/modules/auth';

interface ImportItemProps {
  packId: string;
  currentPack?: any;
  closeModalHandler?: () => void;
  setIsImportItemModalOpen?: (isOpen: boolean) => void;
}

type ImportItem = Omit<Item, 'id'> & { id: string };

export const ImportItem = ({
  currentPack,
  closeModalHandler,
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
