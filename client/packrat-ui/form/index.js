import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  Input,
  Text,
  Button,
  TextArea,
  Label,
  XStack,
  YStack,
} from 'tamagui';
import * as z from 'zod';

function RenderInput({ field, fieldProps }) {
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
}

function RenderError({ error, fieldError }) {
  if (!error && !fieldError) return null;
  return <Text color="danger">{error || fieldError}</Text>;
}

function RenderHelperText({ text }) {
  if (!text) return null;
  return <Text>{text}</Text>;
}

const ReusableForm = forwardRef((props, ref) => {
  const { fields, schema, onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const inputRefs = useRef({});

  const focusInput = (name) => {
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
              fieldError={errors[field.name]?.message}
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
