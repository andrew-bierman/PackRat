import React from 'react';
import { Button } from 'native-base';
import { X } from '@tamagui/lucide-icons';

import { Button as TgButton, Dialog, XStack } from 'tamagui';

export const CustomModal = ({
  id,
  title,
  trigger = 'Open',
  children,
  onSave,
  onCancel,
  buttonColor = 'primary',
  type,
  size = 'lg',
  footerButtons = [],
  isActive,
  onTrigger,
  buttonText,
  triggerComponent = null,
  ...rest
}) => {
  /**
   * Closes the modal either by calling the onCancel function or by triggering the onTrigger function with a value of false.
   *
   * @param {function} onCancel - The function to be called when the modal is closed by canceling.
   * @param {function} onTrigger - The function to be called when the modal is closed by triggering.
   * @return {undefined} This function does not return a value.
   */
  const closeModal = () => {
    if (onCancel) {
      onCancel();
    } else {
      onTrigger(false);
    }
  };

  const triggerElement = triggerComponent ? (
    <Button
      onPress={() => onTrigger(true)}
      style={{ backgroundColor: 'transparent' }}
    >
      {triggerComponent}
    </Button>
  ) : (
    <Button top={5} alignSelf={'center'} onPress={() => onTrigger(true)}>
      {trigger}
    </Button>
  );

  if (onTrigger) {
    return (
      <Dialog
        modal
        open={isActive}
        onOpenChange={(open) => {
          onTrigger(open);
        }}
      >
        <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            minWidth={'400px'}
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
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{children}</Dialog.Description>

            <XStack alignSelf="flex-end" gap="$4">
              {footerButtons.map((button, index) => (
                <Button
                  key={index}
                  onPress={button.onClick}
                  colorScheme={button.color}
                  disabled={button.disabled}
                >
                  {button.label}
                </Button>
              ))}
            </XStack>

            {buttonText && (
              <XStack alignSelf="flex-end" gap="$4">
                <Button colorScheme={buttonColor} onPress={onSave}>
                  {buttonText}
                </Button>
                <Button onPress={closeModal} ml="auto">
                  Cancel
                </Button>
              </XStack>
            )}

            <Dialog.Close asChild>
              <TgButton
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    );
  } else {
    return null;
  }
};
