import { useRef } from 'react';

export const useFormSubmitTrigger = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const triggerFormSubmit = (...params: any[]) => {
    console.log(params);
    formRef.current?.submit?.();
  };

  return [formRef, triggerFormSubmit];
};
