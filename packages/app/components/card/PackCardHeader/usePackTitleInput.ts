import { useEditPack } from 'app/hooks/packs';
import { useRef, useState } from 'react';

export const usePackTitleInput = (data) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const isEditModeRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const { editPack } = useEditPack();

  const handleActionsOpenChange = (state) => {
    setIsOpen(true);
    if (!state && isEditModeRef.current) {
      isEditModeRef.current = false;
      setIsEditMode(true);
      setIsOpen(true);
    }
  };

  const handleEdit = () => {
    isEditModeRef.current = true;
    setIsOpen(false)
  };

  const handleSaveTitle = (title) => {
    const packDetails = {
      id: data.id,
      name: title,
      is_public: data.is_public,
    };
     setIsOpen(false);
    editPack(packDetails);
    setIsEditMode(false);
  };

  return { handleActionsOpenChange, isEditMode, handleEdit, handleSaveTitle,isOpen,setIsOpen };
};
