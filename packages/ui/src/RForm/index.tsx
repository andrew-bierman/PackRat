import React, { useRef, forwardRef, useImperativeHandle, FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  Input,
  Text as OriginalText,
  Button,
  TextArea,
  Label,
  XStack as OriginalXStack,
  YStack,
} from 'tamagui';
import * as z from 'zod';

const Text: any = OriginalText;
const XStack: any = OriginalXStack;

interface FieldProps {
  inputComponent?: string;
  inputType?: string;
  placeholder?: string;
  isDisabled?: boolean;
  maxLength?: number;
  autoCorrect?: boolean;
  autoCapitalize?: string;
  autoFocus?: boolean;
  name: string;
  label?: string;
  errorMessage?: string;
  helperText?: string;
  numberOfLines?: number;
}

interface RenderInputProps {
  field: FieldProps;
  fieldProps: any;
}

const RenderInput: FC<RenderInputProps> = ({ field, fieldProps }) => {
  const commonProps = {
    ...fieldProps,
    placeholder: field.placeholder,
    disabled: field.isDisabled,
    maxLength: field.maxLength,
    autoCorrect: field.autoCorrect,
    autoCapitalize: field.autoCapitalize,
    autoFocus: field.autoFocus,
    id: field.name,
  };

  switch (field.inputComponent) {
    case 'textarea':
      return <TextArea {...commonProps} rows={field.numberOfLines} />;
    default:
      if (field.inputType === 'password') {
        return <Input {...commonProps} type="password" />;
      }
      return <Input {...commonProps} />;
  }
};

interface RenderErrorProps {
  error?: string;
  fieldError?: string;
}

const RenderError: FC<RenderErrorProps> = ({ error, fieldError }) => {
  if (!error && !fieldError) return null;
  return <Text color="danger">{error || fieldError}</Text>;
};

interface RenderHelperTextProps {
  text?: string;
}

const RenderHelperText: FC<RenderHelperTextProps> = ({ text }) => {
  if (!text) return null;
  return <Text>{text}</Text>;
};

interface ReusableFormProps {
  fields: FieldProps[];
  schema: z.Schema<any>;
  onSubmit: SubmitHandler<any>;
}

const ReusableForm = forwardRef<any, ReusableFormProps>((props, ref) => {
  const { fields, schema, onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const focusInput = (name: string) => {
    inputRefs.current[name]?.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: focusInput,
  }));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <XStack
          overflow="hidden"
          space="$2"
          margin="$3"
          padding="$2"
          key={field.name}
        >
          {field.label && <Label htmlFor={field.name}>{field.label}</Label>}
          <YStack space="$1">
            <Controller
              name={field.name}
              control={control}
              render={({ field: fieldProps }) => (
                <RenderInput
                  field={field}
                  fieldProps={{
                    ...fieldProps,
                    ref: (el) => (inputRefs.current[field.name] = el),
                  }}
                />
              )}
            />
            <RenderError
              error={field.errorMessage}
              fieldError={errors[field.name]?.message as string | undefined}
            />
            <RenderHelperText text={field.helperText} />
          </YStack>
        </XStack>
      ))}
      <Form.Trigger asChild>
        <Button>Submit</Button>
      </Form.Trigger>
    </Form>
  );
});

export default ReusableForm;
