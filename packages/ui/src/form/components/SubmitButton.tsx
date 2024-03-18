import { LmSubmitButtonRhf, type LmButtonRhfProps } from '../lib';

interface Props<T extends {}> extends LmButtonRhfProps<T> {
  onSubmit: (values: T) => void;
}

export const SubmitButton = <T extends {}>({
  style = {},
  ...props
}: Props<T>) => {
  const safeStyle = typeof style === 'object' && style !== null ? style : {};
  return (
    <LmSubmitButtonRhf
      style={{
        backgroundColor: '#0C66A1' as any,
        ...safeStyle,
      }}
      {...props}
    />
  );
};
