import React from "react";
import { Modal as NBModal, Box, Heading, Button } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

const GlobalConfirmationBox = ({
  title,
  options,
  numOptions,
  type,
  onConfirm,
  onCancel,
  isActive,
  buttonColor = "primary",
  buttonText = "Confirm",
  ...rest
}) => {
  const closeModal = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleOptionClick = (optionIndex) => {
    if (onConfirm) {
      onConfirm(options[optionIndex]);
    }
    closeModal();
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <Button
        key={index}
        onPress={() => handleOptionClick(index)}
        colorScheme={type}
        mt={3}
      >
        {option}
      </Button>
    ));
  };

  return (
    <NBModal
      isOpen={isActive}
      onClose={closeModal}
      placement="center"
      {...rest}
    >
      <NBModal.Content maxWidth="400px">
        <NBModal.CloseButton />
        <NBModal.Header>
          <Box flexDirection="row" alignItems="center">
            <Icon
              name={
                type === "success"
                  ? "check-circle"
                  : type === "error"
                  ? "error"
                  : "warning"
              }
              size={30}
              color={
                type === "success"
                  ? "green"
                  : type === "error"
                  ? "red"
                  : "yellow"
              }
            />
            <Heading ml={2}>{title}</Heading>
          </Box>
        </NBModal.Header>
        <NBModal.Body>
          <Box>{renderOptions()}</Box>
        </NBModal.Body>
        <NBModal.Footer>
          <Button colorScheme={buttonColor} onPress={onCancel}>
            Cancel
          </Button>
        </NBModal.Footer>
      </NBModal.Content>
    </NBModal>
  );
};

export default GlobalConfirmationBox;
