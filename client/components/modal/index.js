import React, { ReactNode } from "react";
import { Modal as NBModal, Box, Heading, Button } from "native-base";

export const CustomModal = ({
  id,
  title,
  trigger = "Open",
  children,
  onSave,
  onCancel,
  buttonColor = "primary",
  type,
  footerButtons = [],
  isActive,
  onTrigger,
  buttonText,
  triggerComponent = null,
  ...rest
}) => {
  const closeModal = () => {
    if (onCancel) {
      onCancel();
    } else {
      onTrigger(false);
    }
  };

  const triggerElement = triggerComponent || (
    <Button
      top={5}
      alignSelf={"center"}
      w={"30%"}
      onPress={() => onTrigger(true)}
    >
      {trigger}
    </Button>
  );

  return (
    <>
      {triggerElement}
      <NBModal
        isOpen={isActive}
        onClose={closeModal}
        {...rest}
        placement="center"
      >
        <NBModal.Content maxWidth="400px">
          <NBModal.CloseButton />
          <NBModal.Header>
            <Heading>{title}</Heading>
          </NBModal.Header>
          <NBModal.Body>
            <Box>{children}</Box>
          </NBModal.Body>
          <NBModal.Footer>
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
          </NBModal.Footer>
          {buttonText && (
            <NBModal.Footer>
              <Button colorScheme={buttonColor} onPress={onSave}>
                {buttonText}
              </Button>
              <Button onPress={closeModal} ml="auto">
                Cancel
              </Button>
            </NBModal.Footer>
          )}
        </NBModal.Content>
      </NBModal>
    </>
  );
};
