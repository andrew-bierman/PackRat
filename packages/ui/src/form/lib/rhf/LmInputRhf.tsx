import { Controller, FieldValues } from 'react-hook-form';
import { LmInput, LmInputProps } from '../LmInput';
import { LmRhfProps } from './lmRhfProps';

export type LmInputRhfProps<T extends FieldValues = FieldValues> =
  LmInputProps & LmRhfProps<T>;

export function LmInputRhf<T extends FieldValues = FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  isNumeric = false, // Add an isNumeric prop to specify if the input should be treated as numeric
  isDecimal = false,
  keyboardType,
  ...inputProps
}: LmInputRhfProps<T> & { isNumeric?: boolean; isDecimal?: boolean }) {
  if (inputProps.required) {
    rules.required = 'This field is required';
  }

  const handleOnChange =
    isNumeric || isDecimal
      ? (text) => {
          if (isDecimal && /^\d+\.$/.test(text)) {
            return text;
          }

          const number = parseFloat(text);
          // Check if the parsed number is NaN. If so, return an empty string; otherwise, return the number.
          return isNaN(number) ? '' : number;
        }
      : (text) => text;

  return (
    <Controller<T>
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur, ref },
        fieldState: { error },
      }) => (
        <LmInput
          {...inputProps}
          ref={ref}
          keyboardType={getInputKeyboardType({
            isNumeric,
            isDecimal,
            defaultKeyBoardType: keyboardType,
          })}
          value={(value ?? '').toString()} // Ensure value is defined before calling toString()
          onBlur={onBlur}
          error={!!error}
          onChangeText={(text) => onChange(handleOnChange(text))}
          helperText={error ? error.message : inputProps.helperText}
        />
      )}
    />
  );
}

const getInputKeyboardType = ({
  isNumeric = false,
  isDecimal = false,
  defaultKeyBoardType,
}) => {
  if (isNumeric) {
    return 'number-pwd';
  }

  if (isDecimal) {
    return 'decimal-pwd';
  }

  return defaultKeyBoardType;
};
