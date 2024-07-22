import { ImportItem } from '../item/ImportItem';
import { BaseModal } from '@packrat/ui';

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
  return (
    <BaseModal
      title="Import Item"
      trigger="Import Item"
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
