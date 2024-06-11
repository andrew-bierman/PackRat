import { SizeTokens, XStack, XStackProps } from 'tamagui';

export type LmDialogActionsProps = XStackProps & {
  contentPadding?: SizeTokens;
};

export function LmDialogActions({
  children,
  contentPadding = '$4',
  ...rest
}: LmDialogActionsProps) {
  return (
    <XStack
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: `0 ${contentPadding as string} ${contentPadding as string} ${contentPadding as string}`,
      }}
      {...rest}
    >
      {children}
    </XStack>
  );
}

export function LmDialogHeader({
  children,
  contentPadding = '$4',
  ...rest
}: LmDialogActionsProps) {
  return (
    <XStack
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `0 ${contentPadding as string} ${contentPadding as string} ${contentPadding as string}`,
      }}
      {...rest}
    >
      {children}
    </XStack>
  );
}
