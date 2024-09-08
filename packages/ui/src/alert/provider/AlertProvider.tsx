import { createContext, useContext, useState } from 'react';

interface AlertProviderProps {
  children?: any;
  isAlertOpen: boolean;
  setIsAlertOpen: (value: boolean) => void;
}

export const AlertContext = createContext<AlertProviderProps>({
  isAlertOpen: false,
  setIsAlertOpen: () => {},
});

export const AlertProvider = ({
  children,
  isAlertOpen,
  setIsAlertOpen,
}: AlertProviderProps) => {
  const _value = { isAlertOpen, setIsAlertOpen };

  return (
    <AlertContext.Provider value={_value}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);