import React, { useEffect, useMemo, useState } from 'react';
import { Button, AlertDialog } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import RButton from '@packrat/ui/src/RButton';
import RStack from '@packrat/ui/src/RStack';
import { useAlert, AlertProvider } from './provider';

export interface BaseAlertProps {
  id?: string;
  title: string;
  trigger?: string;
  children: React.ReactNode;
  buttonColor?: string;
  footerButtons?: any[];
  triggerComponent?: React.DetailedReactHTMLElement<any, HTMLElement>;
  footerComponent: React.DetailedReactHTMLElement<any, HTMLElement>;
  hideIcon?: boolean;
  isOpen?: boolean | undefined;
  toggle?: any;
  onClose: any;
}

export const BaseAlert = ({
  triggerComponent,
  title,
  trigger,
  footerButtons,
  footerComponent,
  children,
  hideIcon = false,
  isOpen = undefined,
  toggle,
  onClose,
}: BaseAlertProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    if(isOpen !== undefined) {
      setIsAlertOpen(isOpen)
    }
  }, [isOpen])

  const triggerElement = useMemo(() => {
    return triggerComponent ? (
      <RButton
        onPress={() => setIsAlertOpen(true)}
        style={{ backgroundColor: 'transparent' }}
        backgroundColor={'transparent'}
      >
        {React.cloneElement(triggerComponent, { setIsAlertOpen })}
      </RButton>
    ) : (
      <RButton
        top={5}
        alignSelf={'center'}
        onPress={() => setIsAlertOpen(true)}
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
        onPress={withAlertCloseHandler(onClick, () => {
          setIsAlertOpen(false)
          if(toggle) {
            toggle()
          }
        })}
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
      footerComponent && React.cloneElement(footerComponent, { setIsAlertOpen })
    );
  }, [footerComponent]);

  return (
    <AlertDialog
      modal
      open={isAlertOpen}
      onOpenChange={(open) => {
        setIsAlertOpen(open);
      }}
    >
     {!hideIcon && <AlertDialog.Trigger asChild>{triggerElement}</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          minWidth={400}
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
          gap="$4"
        >
          <AlertDialog.Title>{title}</AlertDialog.Title>
          <AlertDialog.Description>
            <AlertProvider
              isAlertOpen={isAlertOpen}
              setIsAlertOpen={setIsAlertOpen}
            >
              {children}
            </AlertProvider>
          </AlertDialog.Description>

          <RStack
            style={{ alignSelf: 'flex-end', flexDirection: 'row' }}
            gap="$4"
          >
            {memoFooterButtons}
          </RStack>
          {footerElement}
          <AlertDialog.Cancel asChild>
            <Button
              onPress={onClose}
              position="absolute"
              backgroundColor="transparent"
              top="$3"
              right="$3"
              size="$2"
              circular
              icon={X}
            />
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

const withAlertCloseHandler =
  (fn, closeHandler) =>
  (...args) =>
    fn?.(...args, closeHandler.bind(null, false));