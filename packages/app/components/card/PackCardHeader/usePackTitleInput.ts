import { useEditPack } from 'app/hooks/packs';
import { useRef, useState } from 'react';

export const usePackTitleInput = (data) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const isEditModeRef = useRef(false);
  const { editPack } = useEditPack();

  const handleActionsOpenChange = (state) => {
    if (!state && isEditModeRef.current) {
      isEditModeRef.current = false;
      setIsEditMode(true);
    }
  };

  const handleEdit = () => {
    isEditModeRef.current = true;
  };

  const handleSaveTitle = (title) => {
    const packDetails = {
      _id: data._id,
      name: title,
      is_public: data.is_public,
    };

    editPack(packDetails);
    setIsEditMode(false);
  };

  return { handleActionsOpenChange, isEditMode, handleEdit, handleSaveTitle };
};
