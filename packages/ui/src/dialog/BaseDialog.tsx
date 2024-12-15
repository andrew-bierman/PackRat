import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

import {
  Adapt,
  Button,
  Dialog as OriginalDialog,
  Sheet as OriginalSheet,
} from 'tamagui';
import RButton from '../RButton';

const Dialog: any = OriginalDialog;
const Sheet: any = OriginalSheet;

interface BaseDialogProps {
  title: string;
  description: string;
  trigger: string;
  triggerComponent?: React.ReactNode;
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

export const BaseDialog = ({
  title,
  description,
  trigger,
  triggerComponent,
  children,
}: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      modal
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        {triggerComponent || <RButton>{trigger}</RButton>}
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$0">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
