import React, { useEffect, useState } from 'react';
import { BaseModal } from '../../../../ui/src/modal/BaseModal';
import RButton from '@packrat/ui/src/RButton';
import RInput from '@packrat/ui/src/RInput';
import { useEditPack } from '../hooks/useEditPack';
import RStack from '@packrat/ui/src/RStack';
import RText from '@packrat/ui/src/RText';
import { Switch } from 'tamagui';
import RSwitch from '@packrat/ui/src/RSwitch';

interface EditPackModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentPack: any;
  refetch?: () => void;
}

export const EditPackModal: React.FC<EditPackModalProps> = ({
  isOpen,
  onClose,
  currentPack,
  refetch,
}) => {
  const [packName, setPackName] = useState(currentPack?.name ?? '');
  const [isPublic, setIsPublic] = useState(currentPack?.is_public ?? true);
  const { editPack, isLoading, isError } = useEditPack();

  const handleEditPack = async () => {
    try {
      editPack(
        { id: currentPack.id, name: packName, is_public: isPublic },
        {
          onSuccess: () => {
            onClose?.();
            refetch?.();
          },
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setPackName(currentPack?.name ?? '');
      setIsPublic(currentPack?.is_public ?? true);
    }
  }, [isOpen]);

  return (
    <BaseModal
      showTrigger={false}
      title="Edit Pack"
      footerButtons={[
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: (_, closeModal) => {
            closeModal();
            onClose?.();
          },
        },
      ]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <RInput
        placeholder="Pack Name"
        value={packName}
        onChangeText={(t) => setPackName(t)}
        style={{ width: 200 }}
      />
      <RStack
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <RText>Public </RText>
        <RSwitch
          checked={isPublic}
          onCheckedChange={() => setIsPublic((prev) => !prev)}
          size="$1.5"
        >
          <Switch.Thumb />
        </RSwitch>
      </RStack>
      <RButton onPress={handleEditPack} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </RButton>
      {isError && (
        <RStack>
          <RText style={{ color: 'red' }}>Failed to save changes</RText>
        </RStack>
      )}
    </BaseModal>
  );
};
