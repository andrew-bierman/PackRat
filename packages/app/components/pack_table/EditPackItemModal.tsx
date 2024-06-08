import React, { cloneElement, isValidElement, ReactNode } from 'react';
import { BaseModal, useModal } from '@packrat/ui';

interface EditPackItemModalProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  showTrigger?: boolean;
  triggerComponent: any;
}

export const EditPackItemModal: React.FC<EditPackItemModalProps> = ({
  children,
  isOpen,
  onClose,
  showTrigger,
  triggerComponent,
}) => {
  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => {
        closeModal();
        if (onClose) onClose();
      },
      color: '#B22222',
      disabled: false,
    },
    // add more footer buttons here if needed
  ];

  const ModalContent = isValidElement(children)
    ? withCloseModalHandler(children)
    : null;

  return (
    
    <BaseModal
      title={'Edit Item'}
      isOpen={isOpen}
      onClose={onClose}
      footerComponent={undefined}
      footerButtons={footerButtons}
      triggerComponent={triggerComponent}
      showTrigger={!!triggerComponent}
    >
      {ModalContent && <ModalContent />}
    </BaseModal>
  );
};

const withCloseModalHandler = (element) => (props) => {
  const { setIsModalOpen } = useModal();

  return cloneElement(element, {
    ...props,
    closeModalHandler: () => setIsModalOpen(false),
  });
};
