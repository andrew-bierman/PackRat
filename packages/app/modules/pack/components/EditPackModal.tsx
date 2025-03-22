import React, { useEffect, useState } from 'react';
import { BaseModal } from '../../../../ui/src/modal/BaseModal';
import { useEditPack } from '../hooks/useEditPack';
import RStack from '@packrat/ui/src/RStack';
import RText from '@packrat/ui/src/RText';
import { Form, FormInput, FormSwitch, useFormSubmitTrigger } from '@packrat/ui';
import { editPack as editPackSchema } from '@packrat/validations';

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
  const [formRef, triggerSubmit] = useFormSubmitTrigger();
  const { editPack, isLoading, isError } = useEditPack();

  const handleEditPack = async (closeModal, { name: packName, is_public }) => {
    try {
      editPack(
        { id: currentPack.id, name: packName, is_public },
        {
          onSuccess: () => {
            closeModal();
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
          label: 'Save',
          color: '#232323',
          onClick: (_, closeModal) => {
            if (typeof triggerSubmit === 'function') {
              triggerSubmit(closeModal);
            }
          },
        },
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
      <RStack style={{ width: 320, gap: 8 }}>
        <Form
          ref={formRef}
          onSubmit={handleEditPack}
          validationSchema={editPackSchema}
          defaultValues={{
            id: currentPack?.id,
            name: currentPack?.name,
            is_public: currentPack?.is_public,
          }}
        >
          <FormInput label="Name" name="name" />
          <FormSwitch name="is_public" labelLeft="Is public" size="$2.5" />
        </Form>
      </RStack>
      {isError && (
        <RStack>
          <RText style={{ color: 'red' }}>Failed to save changes</RText>
        </RStack>
      )}
    </BaseModal>
  );
};
