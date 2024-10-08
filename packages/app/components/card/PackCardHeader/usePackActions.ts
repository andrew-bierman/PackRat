import { useEditPack, useDeletePack } from 'app/modules/pack';
import { useState } from 'react';

export const usePackActions = ({ data, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const { editPack } = useEditPack();
  const { handleDeletePack } = useDeletePack(data.id);

  const handleActionsOpenChange = (state) => {
    switch (state) {
      case 'Edit':
        setIsEditModalOpen(true);
        break;
      case 'Delete':
        handleDeletePack();
        break;
    }
  };

  const handleSaveTitle = (title) => {
    const packDetails = {
      id: data.id,
      name: title,
      is_public: data.is_public,
    };
    editPack(packDetails, {
      onSuccess: () => {
        refetch?.();
      },
    });
    setIsTitleEditMode(false);
  };

  return {
    handleActionsOpenChange,
    isTitleEditMode,
    isEditModalOpen,
    setIsEditModalOpen,
    handleSaveTitle,
  };
};
