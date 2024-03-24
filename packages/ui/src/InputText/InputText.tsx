import RInput from '../RInput';
import RLabel from '../RLabel';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { type TextInput } from 'react-native';
import { type InputTextProps, type InputTextRef } from './types';
import { useFormControl } from './useFormControl';
import { useInputRef } from './useInputRef';

export const InputText: React.ForwardRefExoticComponent<InputTextProps> =
  forwardRef<InputTextRef, InputTextProps>(
    (
      {
        label,
        placeholder,
        isDisabled = false,
        autoFocus = false,
        maxLength,
        name = 'input',
        rules = { required: false },
        keyboardType = 'default',
        secureTextEntry = false,
        control: controlProp,
        ...rest
      },
      ref,
    ) => {
      const control = useFormControl(controlProp);
      const inputRef = useInputRef(ref);

      return (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <RLabel>{label}</RLabel>
              <RInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                underlineColorAndroid="transparent"
                allowFontScaling={false}
                autoComplete={
                  keyboardType === 'email-address' ? 'email' : undefined
                }
                textContentType={
                  keyboardType === 'email-address' ? 'emailAddress' : undefined
                }
                autoCorrect={false}
                autoCapitalize={
                  keyboardType === 'email-address' ? 'none' : 'sentences'
                }
                editable={!isDisabled}
                keyboardType={keyboardType}
                maxLength={maxLength}
                numberOfLines={1}
                autoFocus={autoFocus}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                ref={inputRef as any}
                {...rest}
              />
            </>
          )}
        />
      );
    },
  );
