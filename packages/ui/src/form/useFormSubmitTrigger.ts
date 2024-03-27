import { useRef } from 'react';

export const useFormSubmitTrigger = () => {
  const formRef = useRef<{ submit: (...params: any) => void }>(null);

  const triggerFormSubmit = (...params) => {
    formRef.current?.submit?.(...params);
  };

  return [formRef, triggerFormSubmit];
};
