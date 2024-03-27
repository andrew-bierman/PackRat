import { LmSubmitButtonRhf, type LmButtonRhfProps } from '../lib';

interface Props<T extends {}> extends LmButtonRhfProps<T> {
  onSubmit?: (values: T) => void;
}

export const SubmitButton = <T extends {}>({
  style = {},
  ...props
}: Props<T>) => {
  return (
    <LmSubmitButtonRhf
      style={{ color: '#ffffff', backgroundColor: '#0C66A1', ...style }}
      {...props}
    />
  );
};
