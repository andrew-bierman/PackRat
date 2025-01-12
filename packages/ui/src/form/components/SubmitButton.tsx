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
      $theme-dark={{
        ...({ backgroundColor: '$colors.background' } as any),
      }}
      $theme-light={{
        ...({
          backgroundColor: '#232323',
          fontWeight: 700,
        } as any),
        hoverStyle: {
          backgroundColor: '#232323',
          opacity: 0.8,
        },
      }}
      disabledStyle={{ opacity: 0.6 }}
      style={{
        color: '#fff',
        ...safeStyle,
      }}
      {...props}
    />
  );
};
