import { useRef } from 'react';

export const useFormSubmitTrigger = () => {
  const formRef = useRef(null);

  const triggerFormSubmit = (...params) => {
    console.log(params);
    formRef.current?.submit?.(...params);
  };

  return [formRef, triggerFormSubmit];
};
