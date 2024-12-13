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
      $theme-dark={{ color: 'text', backgroundColor: '$colors.background' }}
      $theme-light={{
        color: 'text',
        backgroundColor: '#232323',
        color: '#ffffff',
        fontWeight: 700,
        hoverStyle: {
          backgroundColor: '#232323',
          opacity: 0.8,
        },
      }}
      disabledStyle={{ opacity: 0.6 }}
      style={{
        ...safeStyle,
      }}
      {...props}
    />
  );
};
