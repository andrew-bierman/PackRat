import { useState } from 'react';

export const useModalState = (defaultState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultState);

  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  return { isModalOpen, onOpen, onClose };
};
