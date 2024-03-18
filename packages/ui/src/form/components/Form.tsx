import { type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldValues,
  Form as RHFForm,
  FormProvider,
  FormSubmitHandler,
  UseFormProps,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Platform } from 'react-native';
export { useFormContext as useAppFormContext } from 'react-hook-form';

interface Props extends Omit<UseFormProps, 'resolver'> {
  validationSchema?: any;
  formRef?: any;
  onSubmit?: FormSubmitHandler<FieldValues>;
  children: ReactNode;
}

// TODO change the name to "Form" after handling tamagui all components export,
// which is cause of a name collision
export const Form = ({
  validationSchema,
  onSubmit,
  children,
  formRef,
  ...formProps
}: Props) => {
  const form = useForm({
    ...formProps,
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
  });

  if (formRef && !formRef?.current && typeof onSubmit === 'function') {
    formRef.current = {
      submit: (...params) =>
        form.handleSubmit(onSubmit.bind(null, ...params))(),
    };
  }

  return (
    <FormProvider {...form}>
      {Platform.OS === 'web' ? (
        <RHFForm onSubmit={form.handleSubmit(onSubmit || (() => {})) as any}>
          {children}
        </RHFForm>
      ) : (
        <>{children}</>
      )}
    </FormProvider>
  );
};
