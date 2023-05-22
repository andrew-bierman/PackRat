import React, { useState } from "react";
import { Platform } from "react-native";
import { CustomModal } from "../modal";
import { Input, VStack, HStack, Text } from "native-base";

const NumberInput = (props) => {
  const { min, max, value, ...otherProps } = props;

  // Custom validation function to enforce positive numbers only
  const validateNumber = (text) => {
    const sanitizedText = text.replace(/[^0-9-]/g, ""); // Allow only numbers and minus sign

    if (sanitizedText === "") {
      return "";
    }

    const number = parseInt(sanitizedText, 10);

    if (isNaN(number) || number < 0) {
      // Check for NaN and negative numbers
      return "";
    }

    if (typeof min !== "undefined" && number < min) {
      return min.toString();
    }

    if (typeof max !== "undefined" && number > max) {
      return max.toString();
    }

    return sanitizedText;
  };

  const handleChangeText = (text) => {
    const validatedText = validateNumber(text);
    // Pass the sanitized text back to the parent component
    otherProps.onChangeText && otherProps.onChangeText(validatedText);
  };

  return (
    <Input
      {...otherProps}
      value={value}
      keyboardType="numeric"
      onChangeText={handleChangeText}
    />
  );
};

export const SaveTripContainer = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  return (
    <CustomModal
      title="Save Trip"
      trigger="Save Trip"
      isActive={isSaveModalOpen}
      onTrigger={() => setIsSaveModalOpen(!isSaveModalOpen)}
      footerButtons={[
        {
          label: "Save",
          onPress: () => console.log("Save"),
        },
      ]}
    >
      <VStack>
        <Input placeholder="Trip Name" />
        <Input placeholder="Trip Description" />
        <>
          <Text>Duration</Text>
          <NumberInput placeholder="Number of nights" min={0} max={100} />

          <HStack>
            <Input placeholder="Trip Start Date" />
            <Input placeholder="Trip End Date" />
          </HStack>
        </>
        <>
          <Text>Trip Weather</Text>
          <Text>`Abbreviated Weather Info`</Text>
        </>
        <HStack>
          <Text>Pack</Text>
          <Text>`Selected Pack Name`</Text>
        </HStack>
        <HStack>
          <Text>Trip Location</Text>
          <Text>`Selected Location`</Text>
        </HStack>
        <HStack>
          <Text>Selected Trail</Text>
          <Text>`Selected Trail`</Text>
        </HStack>
      </VStack>
    </CustomModal>
  );
};
