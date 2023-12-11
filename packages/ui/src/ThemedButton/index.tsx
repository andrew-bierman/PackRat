import { Activity, Airplay } from '@tamagui/lucide-icons';
import { Button, XGroup, XStack, YStack } from 'tamagui';

export function ThemedButton({ children, ...restProps }) {
  return (
    <YStack padding="$3" space="$3" {...restProps}>
      {children}
    </YStack>
  );
}

export function ButtonRow({ children, ...restProps }) {
  return <XStack space="$2" justifyContent="center" {...restProps}>{children}</XStack>;
}

export function DemoButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
}

export function DemoGroup({ children, ...restProps }) {
  return <XGroup {...restProps}>{children}</XGroup>;
}

export function DemoGroupItem({ children, ...restProps }) {
  return <XGroup.Item {...restProps}>{children}</XGroup.Item>;
}
