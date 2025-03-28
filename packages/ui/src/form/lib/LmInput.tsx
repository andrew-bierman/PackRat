import { Input, InputProps, Stack as OriginalStack, TextArea } from 'tamagui';
import { forwardRef, useId, useState } from 'react';
import { LmFormFieldContainer } from './LmFormFieldContainer';
import { LmFormContainerBaseTypes } from './formContainerTypes';
import { Pressable } from 'react-native';
import {
  EyeRegular,
  EyeSlashRegular,
  IconProps,
} from '../../extras/lib/core/src';

const Stack: any = OriginalStack;

export type LmInputProps = InputProps &
  LmFormContainerBaseTypes & {
    multiline?: boolean;
    isPassword?: boolean;
    fullWidth?: boolean;
    passwordIconProps?: IconProps;
  };

export const LmInput = forwardRef(function LmInputEl(
  {
    required,
    error,
    helperText,
    helperTextProps,
    label,
    labelProps,
    labelInline,
    multiline,
    containerProps,
    isPassword,
    passwordIconProps,
    fullWidth,
    ...rest
  }: LmInputProps,
  ref,
) {
  const genId = useId();
  const [show, setShow] = useState<boolean>(false);
  const id = rest.id || genId;
  const currentInputProps = {
    ...rest,
  };
  if (error) {
    currentInputProps.theme = 'red';
    currentInputProps.style = {
      borderColor: error ? '$red8' : undefined,
    };
  }
  if (fullWidth) {
    currentInputProps.style = {
      minWidth: '100%',
    };
  }

  let secureTextEntry = !!(rest.secureTextEntry || isPassword);

  return (
    <LmFormFieldContainer
      id={id}
      error={error}
      required={required}
      labelProps={labelProps}
      label={label}
      fullWidth={fullWidth}
      size={rest.size}
      labelInline={labelInline}
      helperText={helperText}
      helperTextProps={helperTextProps}
      {...(containerProps as any)}
    >
      {multiline ? (
        <TextArea
          {...currentInputProps}
          placeholderTextColor={rest.placeholderTextColor}
          ref={ref as any}
        />
      ) : secureTextEntry ? (
        <Stack
          position={'relative'}
          width={fullWidth ? '100%' : currentInputProps?.width}
        >
          <Input
            {...currentInputProps}
            ref={ref as any}
            secureTextEntry={!show}
            autoCapitalize="none"
            placeholderTextColor={
              rest.placeholderTextColor as InputProps['placeholderTextColor']
            }
          />
          <Pressable
            style={{
              position: 'absolute',
              top: '50%',
              transform: [{ translateY: -0.5 * 20 }],
              height: 20,
              ...(rest?.direction === 'rtl'
                ? {
                    left: 15,
                  }
                : {
                    right: 15,
                  }),
            }}
            onPress={() => {
              setShow((state) => !state);
            }}
          >
            {show ? (
              <EyeSlashRegular {...passwordIconProps} />
            ) : (
              <EyeRegular {...passwordIconProps} />
            )}
          </Pressable>
        </Stack>
      ) : (
        <Input {...currentInputProps} autoCapitalize="none" ref={ref as any} />
      )}
    </LmFormFieldContainer>
  );
});
