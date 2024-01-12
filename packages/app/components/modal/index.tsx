import React from 'react';
import { RButton, RStack } from '@packrat/ui';
import { X } from '@tamagui/lucide-icons';

import { Dialog } from 'tamagui';

interface PropTypes {
  id?: string;
  title: string;
  trigger?: string;
  children: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  buttonColor?: string;
  type?: string;
  size?: string;
  footerButtons?: any[];
  isActive: boolean;
  onTrigger: (value: boolean) => void;
  buttonText?: string;
  triggerComponent?: React.ReactNode;
}
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
}: PropTypes) => {
  /**
   *
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
    <RButton
      onPress={() => onTrigger(true)}
      style={{ backgroundColor: 'transparent' }}
    >
      {triggerComponent}
    </RButton>
  ) : (
    <RButton top={5} alignSelf={'center'} onPress={() => onTrigger(true)}>
      {trigger}
    </RButton>
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

            <RStack
              style={{ alignSelf: 'flex-end', flexDirection: 'row' }}
              gap="$4"
            >
              {footerButtons.map((button, index) => (
                <RButton
                  key={index}
                  onPress={button.onClick}
                  backgroundColor={button.color}
                  disabled={button.disabled}
                  color="white"
                >
                  {button.label}
                </RButton>
              ))}
            </RStack>

            {buttonText && (
              <RStack
                style={{ alignSelf: 'flex-end', flexDirection: 'row' }}
                gap="$4"
              >
                <RButton onPress={onSave}>{buttonText}</RButton>
                <RButton onPress={closeModal} ml="auto">
                  Cancel
                </RButton>
              </RStack>
            )}

            <Dialog.Close asChild>
              <RButton
                position="absolute"
                backgroundColor="transparent"
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
