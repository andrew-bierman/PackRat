import { useState } from 'react';
import { useModalState } from '@packrat/ui';
import { useTogglePackItem } from './useToggleItemPack';

export const useItemPackPicker = () => {
  const { isModalOpen, onOpen, onClose } = useModalState();
  const [itemId, setItemId] = useState('');
  const { togglePackItem } = useTogglePackItem();

  const onPress = (id: string, e: any) => {
    e.stopPropagation();
    setItemId(id);
    onOpen();
  };

  const handleClose = () => {
    setItemId('');
    onClose();
  };

  const handleChange = async (packId: string) => {
    try {
      await togglePackItem({ itemId, packId });
    } catch {}
  };

  return {
    onTriggerOpen: onPress,
    overlayProps: {
      onClose: handleClose,
      itemId,
      onChange: handleChange,
      isOpen: isModalOpen,
      title: 'Add Item To Your Packs',
    },
  };
};
