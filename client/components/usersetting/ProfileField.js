import React, { useState } from "react";
import { Box, Text, Button } from "native-base";
import { StyleSheet, TextInput } from "react-native";
import { theme } from "../../../theme";

const ProfileField = ({ label, value, onChangeText, onSave }) => {
  const [editable, setEditable] = useState(false);

  const onPressChange = (label) => {
    if (editable) {
      onSave(label); // Save the updated value
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  return (
    <Box style={styles.container}>
      <Text fontSize={{ base: "sm", md: theme.font.size }} style={styles.label}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        style={styles.textContainer}
        id={label}
      />
      <Button
        onPress={() => {
          onPressChange(label);
        }}
        size="sm"
        variant={editable ? "solid" : "outline"} // Change variant based on editable state
      >
        {editable ? "Submit" : "Change"}
        {/* Change button text based on editable state */}
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    marginBottom: 5,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  textContainer: {
    flex: 2,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});

export default ProfileField;
