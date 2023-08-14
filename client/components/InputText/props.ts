import { IInputProps } from "native-base";
import React from "react";
import { UseControllerProps } from "react-hook-form";
import { KeyboardTypeOptions } from "react-native";

export type InputTextRef = {
  /**
   * When called, will focus inputText component
   */
  focus: () => void;
};

export type InputTextProps = {
  /**
   * Input label
   */
  label?: string;

  /**
   * If set, will display placeholder instead of label if
   * component is empty
   */
  placeholder?: string;

  /**
   * If set to true, will disable input
   */
  isDisabled?: boolean;

  /**
   * If set to true, will set maximum length
   */
  maxLength?: number;

  /**
   * If set to true, will automatically focus input element
   */
  autoFocus?: boolean;

  /**
   * enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad',
   * 'decimal-pad', 'twitter', 'web-search', 'visible-password')
   * Determines which keyboard to open, e.g.numeric.
   * The following values work across platforms: - default - numeric - email-address - phone-pad
   * The following values work on iOS: - ascii-capable - numbers-and-punctuation - url - number-pad - name-phone-pad - decimal-pad - twitter - web-search
   * The following values work on Android: - visible-password
   */
  keyboardType?: KeyboardTypeOptions;

  /**
   * If true, the text input obscures the text entered so that sensitive text like passwords stay secure.
   * The default value is false.
   */
  secureTextEntry?: boolean | undefined;

  control?: UseControllerProps["control"];
  name?: UseControllerProps["name"];
  rules?: UseControllerProps["rules"];
} & IInputProps &
  React.RefAttributes<InputTextRef>;
