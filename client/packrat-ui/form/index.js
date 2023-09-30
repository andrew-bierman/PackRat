import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Text, TextArea, Label, XStack, YStack } from 'tamagui';
import { Button, VStack } from 'native-base';
import CustomSelect from '../CustomSelect';
import CustomRadio from '../CustomRadio';

function RenderInput({ field, fieldProps, control, error }) {
  const commonProps = {
    ...fieldProps,
    placeholder: field.placeholder,
    disabled: field.isDisabled,
    maxLength: field.maxLength,
    autoCorrect: field.autoCorrect,
    autoCapitalize: field.autoCapitalize,
    autoFocus: field.autoFocus,
    id: field.name,
    label: field.placeholder,
    control,
    booleanStrings: field.booleanStrings,
    'aria-labelledby': field['aria-labelledby'],
    baseEssential: field.baseEssential,
    allowFontScaling: false,
  };

  console.log('props', commonProps);

  const RenderInputType = () => {
    switch (field.inputComponent) {
      case 'textarea':
        return <TextArea {...commonProps} rows={field.numberOfLines} />;
      case 'select': {
        const { ref, ...props } = commonProps;
        return <CustomSelect items={field.items} props={props} />;
      }
      case 'radio': {
        const { ref, ...props } = commonProps;
        return <CustomRadio items={field.items} props={props} />;
      }

      default:
        const [isFocused, setIsFocused] = useState(false);
        const { booleanStrings, ...props } = {
          ...commonProps,
          borderColor: error && !isFocused ? 'red' : undefined,
          onBlur: () => setIsFocused(false),
          onFocus: () => setIsFocused(true),
        };

        if (field.inputType === 'password') {
          return <Input {...props} type="password" />;
        }
        return <Input {...props} />;
    }
  };

  return (
    <YStack>
      {RenderInputType()}
      {error && (
        <Text color="red" fontSize={'10px'}>
          {error.message || 'Error'}
        </Text>
      )}
    </YStack>
  );
}

function RenderHelperText({ text }) {
  if (!text) return null;
  return <Text>{text}</Text>;
}

const ReusableForm = forwardRef((props, ref) => {
  const [isValidated, setIsValidated] = useState(true);
  const { fields, schema, onSubmit, submitText, defaultValues, children } =
    props;
  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: defaultValues ?? defaultValues,
    resolver: zodResolver(schema),
  });

  const inputRefs = useRef({});

  const focusInput = (name) => {
    inputRefs.current[name]?.focus();
  };

  useEffect(() => {
    const subscription = watch((data) => {
      try {
        schema.parse(data);
        clearErrors();
        setIsValidated(false);
      } catch (error) {
        trigger();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Form onSubmit={() => handleSubmit(onSubmit)} minWidth={'300px'}>
      {fields.map((field) => (
        <XStack overflow="hidden" key={field.name} flexDirection="column">
          {field.label && (
            <Label
              htmlFor={field.name}
              color="gray"
              fontSize={15}
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {field.label}
            </Label>
          )}
          <YStack space="$1" padding={'1px'}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: fieldProps, fieldState: { error } }) => (
                <RenderInput
                  field={field}
                  control={control}
                  error={error}
                  fieldProps={{
                    ...fieldProps,
                    ref: (el) => (inputRefs.current[field.name] = el),
                  }}
                />
              )}
            />
            <RenderHelperText text={field.helperText} />
          </YStack>
        </XStack>
      ))}
      {children}
      {onSubmit && (
        <Form.Trigger asChild>
          <VStack alignItems={'center'}>
            <Button
              mt="2"
              colorScheme={'indigo'}
              alignContent={'center'}
              type="submit"
              onPress={handleSubmit(onSubmit)}
              disabled={isValidated}
            >
              {submitText}
            </Button>
          </VStack>
        </Form.Trigger>
      )}
    </Form>
  );
});

export default ReusableForm;
