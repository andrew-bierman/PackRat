import { BaseModal, RButton, RInput } from '@packrat/ui';
import { useAuthUser } from 'app/auth/hooks';
import { useRouter } from 'app/hooks/router';
import { useAddNewPack, usePackId } from 'app/hooks/packs';
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';
import { useState } from 'react';

export const CopyPackModal = ({ isOpen, onSuccess, currentPack }) => {
  const [packName, setPackName] = useState('');
  const [_, setPackIdParam] = usePackId();
  const user = useAuthUser();
  const router = useRouter();


  const {
    addNewPackAsync,
    isError,
    isLoading: isAddLoading,
    setIsPublic,
    packSelectOptions,
  } = useAddNewPack();

  const {
    // mutation: addPackItemMutation
    isLoading: addItemLoading,
    isError: addItemError,
    addPackItem,
  } = useAddPackItem();

  const handleCopyPack = async () => {
    try {
      const response = await addNewPackAsync({
        name: packName,
        is_public: currentPack.is_public,
      });
      for (const item of currentPack.items) {
        await addPackItem({
          name: item.name,
          weight: item.weight,
          quantity: item.quantity,
          unit: item.unit,
          packId: response.id,
          type: item.category.name,
          ownerId: user.id,
        });
      }
      onSuccess();

      router.push(`/pack/${response.id}`);
      setPackIdParam(response.id);
      console.log('copied pack');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BaseModal
      showTrigger={false}
      title="Copy Pack"
      trigger="Copy Pack"
      footerButtons={[
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: (_, closeModal) => closeModal(),
        },
      ]}
      footerComponent={undefined}
      isOpen={isOpen}
    >
      <RInput
        placeholder="Pack Name"
        name="name"
        label="Name"
        value={packName}
        onChangeText={(t) => setPackName(t)}
        style={{ width: 200 }}
      ></RInput>
      <RButton onPress={handleCopyPack}>Add +</RButton>
    </BaseModal>
  );
};
