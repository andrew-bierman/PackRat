import React, { useEffect, useMemo, useState } from 'react';
import { Button as OriginalButton, Dialog as OriginalDialog } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import OriginalRButton from '@packrat/ui/src/RButton';
import RStack from '@packrat/ui/src/RStack';
import { ModalProvider } from './provider';
import { Platform, Dimensions } from 'react-native';

const Dialog: any = OriginalDialog;
const Button: any = OriginalButton;
const RButton: any = OriginalRButton;

export interface BaseModalProps {
  id?: string;
  title: string;
  trigger?: string;
  children: React.ReactNode;
  buttonColor?: string;
  footerButtons?: any[];
  triggerComponent?: React.ReactElement;
  footerComponent?: React.DetailedReactHTMLElement<any, HTMLElement>;
  isOpen?: Boolean;
  onOpen?: () => void;
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
  onOpen,
  isOpen,
  showTrigger = true,
}: BaseModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen !== undefined && isModalOpen !== isOpen)
      setIsModalOpen(!!isOpen);
  }, [isOpen]);

  const triggerElement = useMemo(() => {
    return triggerComponent ? (
      <RButton
        onPress={() => setIsModalOpen(true)}
        style={{ backgroundColor: 'transparent' }}
        unstyled
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

  const dialogContentStyle =
    Platform.OS !== 'web'
      ? { maxWidth: Dimensions.get('screen').width - 36 }
      : undefined;

  return (
    <Dialog
      modal
      open={isModalOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open);
        if (open && onOpen) onOpen();
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
          style={dialogContentStyle}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <ModalProvider
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          >
            {children}
          </ModalProvider>

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

      {/* <Adapt when="sm" platform="touch">
        <Dialog.Sheet
          snapPointsMode="fit"
          animation="medium"
          zIndex={200000}
          modal
          dismissOnSnapToBottom
        >
          <Dialog.Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Dialog.Sheet.Frame>
          <Dialog.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Dialog.Sheet>
      </Adapt> */}
    </Dialog>
  );
};

const withModalCloseHandler =
  (fn, closeHandler) =>
  (...args) =>
    fn?.(...args, closeHandler.bind(null, false));
