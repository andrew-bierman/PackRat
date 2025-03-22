import { LmSelect, LmSelectProps } from '../LmSelect';
import { Controller, FieldValues } from 'react-hook-form';
import { LmRhfProps } from './lmRhfProps';

export type LmSelectRhfProps<T extends FieldValues> = LmSelectProps &
  LmRhfProps<T> & {
    style?: any; // allow style
  };

export function LmSelectRhf<T extends FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  style, // newly added
  ...inputProps
}: LmSelectRhfProps<T>) {
  if (inputProps.required) {
    rules.required = 'This field is required';
  }
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, ref },
        fieldState: { error, invalid },
      }) => (
        <LmSelect
          {...inputProps}
          style={style}
          value={value ?? ''}
          error={invalid}
          onValueChange={onChange}
          helperText={error ? error.message : inputProps.helperText}
        />
      )}
    />
  );
}
