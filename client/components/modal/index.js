import React, { ReactNode } from 'react'
import { Modal as NBModal, Box, Heading, Button } from 'native-base'

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
      onCancel()
    } else {
      onTrigger(false)
    }
  }

  const triggerElement = triggerComponent || (
    <Button
      top={5}
      alignSelf={'center'}
      w={'30%'}
      onPress={() => onTrigger(true)}
    >
      {trigger}
    </Button>
  )

  return (
    <>
      {triggerElement}
      <NBModal
        isOpen={isActive}
        onClose={closeModal}
        size={size}
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
  )
}
