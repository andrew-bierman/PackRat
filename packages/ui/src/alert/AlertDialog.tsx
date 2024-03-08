import { useState } from 'react';

import { Adapt, Button, AlertDialog, Sheet } from 'tamagui';

export const Alert = ({ title, description, trigger, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog
      modal
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <AlertDialog.Trigger asChild>
        <Button>{trigger}</Button>
      </AlertDialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap>
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
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
          gap
        >
          <AlertDialog.Title>{title}</AlertDialog.Title>

          <AlertDialog.Description>{description}</AlertDialog.Description>
          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};
