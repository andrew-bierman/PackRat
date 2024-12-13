import React from 'react';
import { ImportItem } from './ImportItem';
import { BaseModal } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import RSecondaryButton from 'app/components/RSecondaryButton';

interface ImportItemModalProps {
  currentPackId: string;
  currentPack: any;
  isImportItemModalOpen: boolean;
  setIsImportItemModalOpen: any;
}

export const ImportItemModal = ({
  currentPackId,
  currentPack,
  isImportItemModalOpen,
  setIsImportItemModalOpen,
}: ImportItemModalProps) => {
  const { currentTheme } = useTheme();

  return (
    <BaseModal
      title="Import Item"
      triggerComponent={
        <RSecondaryButton
          label="Import Item"
          onPress={() => setIsImportItemModalOpen(true)}
        />
      }
      footerComponent={undefined}
      isOpen={isImportItemModalOpen}
      onOpen={() => setIsImportItemModalOpen(true)}
      onClose={() => setIsImportItemModalOpen(false)}
    >
      <ImportItem
        packId={currentPackId}
        currentPack={currentPack}
        closeModalHandler={() => setIsImportItemModalOpen(false)}
      />
    </BaseModal>
  );
};
