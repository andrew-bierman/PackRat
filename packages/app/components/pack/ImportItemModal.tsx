import { ImportItem } from '../item/ImportItem';
import { BaseModal } from '@packrat/ui';

interface ImportItemModalProps {
  currentPackId: string;
  currentPack: any;
  isImportItemModalOpen: boolean;
  setIsImportItemModalOpen: any;
  setRefetch?: () => void;
}

export const ImportItemModal = ({
  currentPackId,
  currentPack,
  isImportItemModalOpen,
  setIsImportItemModalOpen,
  setRefetch = () => {},
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
        setRefetch={setRefetch}
        closeModalHandler={() => setIsImportItemModalOpen(false)}
      />
    </BaseModal>
  );
};
