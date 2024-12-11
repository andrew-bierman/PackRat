import React from 'react';
import { ImportItem } from './ImportItem';
import { BaseModal, RStack, RText } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';

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

  const CustomTriggerButton = (
    <RStack
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <RText
        style={{
          color: currentTheme.colors.text,
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        Import Item
      </RText>
    </RStack>
  );

  return (
    <BaseModal
      title="Import Item"
      triggerComponent={CustomTriggerButton}
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
