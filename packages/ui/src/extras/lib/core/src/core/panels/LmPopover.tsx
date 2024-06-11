import {
  Popover as OriginalPopover,
  PopoverContentProps,
  PopoverProps,
  useControllableState,
} from 'tamagui';
import { ReactNode } from 'react';
import { LmSheet, LmSheetProps } from './LmSheet';

export type LmPopoverProps = PopoverProps & {
  trigger?: ReactNode;
  hideArrow?: boolean;
  contentProps?: Omit<PopoverContentProps, 'ref'>;
  isBouncy?: boolean;
  sheetProps?: LmSheetProps;
};

const Popover: any = OriginalPopover;

export function LmPopover({
  trigger,
  children,
  hideArrow,
  contentProps,
  isBouncy = true,
  sheetProps,
  ...popoverProps
}: LmPopoverProps) {
  const { onOpenChange, open, defaultOpen, ...rest } = popoverProps;
  const [currentOpen, setOpen] = useControllableState({
    onChange: onOpenChange,
    defaultProp: defaultOpen,
    prop: open,
  });

  // Check if contentProps is defined and if padding is a property of contentProps
  const padding =
    contentProps && 'padding' in contentProps ? contentProps.padding : 0;

  return (
    <Popover size="$5" {...rest} open={currentOpen} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Adapt when={'sm'} platform="touch">
        <LmSheet {...sheetProps}>
          <Popover.Adapt.Contents />
        </LmSheet>
      </Popover.Adapt>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        {...(isBouncy && {
          enterStyle: { x: 0, y: -10, opacity: 0 },
          exitStyle: { x: 0, y: -10, opacity: 0, pointerEvents: 'none' },
          x: 0,
          y: 0,
          o: 1,
          animation: [
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ],
        })}
        elevate
        padding={padding}
        {...contentProps}
      >
        {!hideArrow && (
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        )}
        {children}
      </Popover.Content>
    </Popover>
  );
}
