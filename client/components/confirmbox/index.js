import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
export const GlobalConfirmationBox = ({
  title,
  options,
  numOptions,
  type,
  openModal,
  closeModal,
  isVisible,
}) => {
  const renderOptions = () => {
    return options.map((option, index) => (
      <TouchableOpacity key={index} onPress={closeModal}>
        <Text>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <Modal isVisible={isVisible}>
        <View style={{ backgroundColor: "white", padding: 20 }}>
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
              type === "success" ? "green" : type === "error" ? "red" : "yellow"
            }
          />
          <Text style={{ fontSize: 20, marginTop: 10 }}>{title}</Text>
          {renderOptions()}
        </View>
      </Modal>
    </>
  );
};
