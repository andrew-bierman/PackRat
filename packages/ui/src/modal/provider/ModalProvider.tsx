import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext({});

export const ModalProvider = ({ children, isModalOpen, setIsModalOpen }) => {
  const _value = { isModalOpen, setIsModalOpen };

  return (
    <ModalContext.Provider value={_value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
