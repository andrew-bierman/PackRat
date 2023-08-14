import { FormControl, Input } from "native-base";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { InputTextProps, InputTextRef } from "./props";

export const InputText: React.ForwardRefExoticComponent<InputTextProps> =
  forwardRef<InputTextRef, InputTextProps>((props, ref) => {
    const {
      label,
      placeholder,
      isDisabled = false,
      autoFocus = false,
      maxLength,
      control,
      name,
      rules,
      keyboardType = "default",
      secureTextEntry = false,
    } = props;

    const inputRef = useRef<TextInput>(null);
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

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
            <FormControl isInvalid={error ? true : false}>
              <FormControl.Label>{label}</FormControl.Label>
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                underlineColorAndroid="transparent"
                allowFontScaling={false}
                autoComplete={
                  keyboardType === "email-address" ? "email" : undefined
                }
                textContentType={
                  keyboardType === "email-address" ? "emailAddress" : undefined
                }
                autoCorrect={false}
                autoCapitalize={
                  keyboardType === "email-address" ? "none" : "sentences"
                }
                editable={!isDisabled}
                keyboardType={keyboardType}
                maxLength={maxLength}
                numberOfLines={1}
                autoFocus={autoFocus}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                ref={inputRef}
              />
              {error && (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: "xs",
                  }}
                >
                  {error.message || "Error"}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </>
        )}
      />
    );
  });
