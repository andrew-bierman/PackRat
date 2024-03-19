import React, { useMemo, useState } from 'react';
import { Button, Dialog } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import RButton from '@packrat/ui/src/RButton';
import RStack from '@packrat/ui/src/RStack';
import { useModal, ModalProvider } from './provider';

export interface BaseModalProps {
  id?: string;
  title: string;
  trigger?: string;
  children: React.ReactNode;
  buttonColor?: string;
  footerButtons?: any[];
  triggerComponent?: React.DetailedReactHTMLElement<any, HTMLElement>;
  footerComponent: React.DetailedReactHTMLElement<any, HTMLElement>;
  isOpen?: Boolean;
  onClose?: () => void;
  showTrigger?: Boolean;
}

export const BaseModal = ({
  triggerComponent,
  title,
  trigger,
  footerButtons,
  footerComponent,
  children,
  onClose,
  isOpen,
  showTrigger = true
}: BaseModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerElement = useMemo(() => {
    return triggerComponent ? (
      <RButton
        onPress={() => setIsModalOpen(true)}
        style={{ backgroundColor: 'transparent' }}
        backgroundColor={'transparent'}
      >
        {React.cloneElement(triggerComponent, { setIsModalOpen })}
      </RButton>
    ) : (
      <RButton
        top={5}
        alignSelf={'center'}
        onPress={() => setIsModalOpen(true)}
      >
        {trigger}
      </RButton>
    );
  }, [triggerComponent]);

  const memoFooterButtons = useMemo(() => {
    if (!Array.isArray(footerButtons)) return null;

    return footerButtons.map(({ color, label, onClick, ...button }, index) => (
      <RButton
        key={index}
        onPress={withModalCloseHandler(onClick, setIsModalOpen)}
        backgroundColor={color}
        disabled={button.disabled}
        color="white"
        {...button}
      >
        {label}
      </RButton>
    ));
  }, [footerButtons]);

  const footerElement = useMemo(() => {
    return (
      footerComponent && React.cloneElement(footerComponent, { setIsModalOpen })
    );
  }, [footerComponent]);

  return (
    <Dialog
      modal
      open={isModalOpen || !!isOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open && onClose) onClose();
      }}
    >
      {showTrigger && <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          minWidth={400}
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
          <Dialog.Description>
            <ModalProvider
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            >
              {children}
            </ModalProvider>
          </Dialog.Description>

          <RStack
            style={{ alignSelf: 'flex-end', flexDirection: 'row' }}
            gap="$4"
          >
            {memoFooterButtons}
          </RStack>
          {footerElement}
          <Dialog.Close asChild>
            <Button
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
};

const withModalCloseHandler =
  (fn, closeHandler) =>
  (...args) =>
    fn?.(...args, closeHandler.bind(null, false));
