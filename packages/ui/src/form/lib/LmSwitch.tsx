import {
  Label,
  StackProps,
  Switch,
  SwitchProps,
  XStack as OriginalXStack,
} from 'tamagui';
import { useId } from 'react';

const XStack: any = OriginalXStack;

export type LmSwitchProps = SwitchProps & {
  labelLeft?: string;
  labelRight?: string;
  thumbProps?: StackProps;
};

export function LmSwitch({
  labelLeft,
  labelRight,
  space,
  size = '$2',
  thumbProps,
  ...rest
}: LmSwitchProps) {
  const id = useId();
  return (
    <XStack alignItems={'center'} space={'$4'}>
      {labelLeft && (
        <Label htmlFor={id} size={size}>
          {labelLeft}
        </Label>
      )}
      <Switch id={id} {...rest} size={size}>
        <Switch.Thumb animation={'bouncy'} {...thumbProps} />
      </Switch>
      {labelRight && (
        <Label htmlFor={id} size={size}>
          {labelRight}
        </Label>
      )}
    </XStack>
  );
}
