import { forwardRef, useImperativeHandle, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldValues,
  FormProvider,
  FormSubmitHandler,
  UseFormProps,
  useForm,
} from 'react-hook-form';
export { useFormContext as useAppFormContext } from 'react-hook-form';

interface Props extends Omit<UseFormProps, 'resolver'> {
  validationSchema?: any;
  formRef?: any;
  onSubmit?: any;
  children: ReactNode;
}

export const Form = forwardRef<any, Props>(
  ({ validationSchema, onSubmit, children, ...formProps }, ref) => {
    const form = useForm({
      ...formProps,
      resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    });

    useImperativeHandle(ref, () => {
      return {
        submit: (...params) =>
          typeof onSubmit === 'function' &&
          form.handleSubmit(onSubmit.bind(null, ...params))(),
      };
    }, [form, onSubmit]);

    return (
      <FormProvider {...form}>
        <>{children}</>
      </FormProvider>
    );
  },
);
