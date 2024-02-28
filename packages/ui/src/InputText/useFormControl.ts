import { useForm } from 'react-hook-form';

export const useFormControl = (controlProp) => {
  const formControl = useForm();

  return controlProp || formControl.control;
};
