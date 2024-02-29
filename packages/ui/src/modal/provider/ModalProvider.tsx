import { createContext, useContext, useState } from 'react';

interface ModalProviderProps {
  children?: any;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const ModalContext = createContext<ModalProviderProps>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export const ModalProvider = ({
  children,
  isModalOpen,
  setIsModalOpen,
}: ModalProviderProps) => {
  const _value = { isModalOpen, setIsModalOpen };

  return (
    <ModalContext.Provider value={_value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
