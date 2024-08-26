import { View } from 'react-native';
import { useModal } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import { ImportForm } from './ImportForm';

export const ImportItemGlobal = () => {
  const authUser = useAuthUser();
  const ownerId = authUser?.id;

  if (!authUser) {
    return null;
  }

  const { setIsModalOpen } = useModal();

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <View>
      <ImportForm
        closeModalHandler={closeModalHandler}
        currentpage="items"
        ownerId={ownerId}
      />
    </View>
  );
};
