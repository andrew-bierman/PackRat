import { LmSubmitButtonRhf, type LmButtonRhfProps } from '@tamagui-extras/form';

interface Props<T extends {}> extends LmButtonRhfProps<T> {
  onSubmit: (values: T) => void;
}

export const SubmitButton = <T extends {}>({
  style = {},
  ...props
}: Props<T>) => {
  return (
    <LmSubmitButtonRhf style={{ color: '#ffffff', ...style }} {...props} />
  );
};
