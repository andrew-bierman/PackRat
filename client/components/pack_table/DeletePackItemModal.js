import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/itemsStore";
import { CustomModal } from "../modal";

export const DeletePackItemModal = ({ itemId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const closeModalHandler = () => setIsModalOpen(false);

  const onTrigger = () => {
    setIsModalOpen(true);
  };

  const deleteItemHandler = () => {
    dispatch(deleteItem(itemId));
    setIsModalOpen(false);
  };

  const footerButtons = [
    {
      label: "Cancel",
      onClick: closeModalHandler,
      color: "gray",
      disabled: false,
    },
    {
      label: "Delete",
      onClick: deleteItemHandler,
      color: "danger",
      disabled: false,
    },
  ];

  return (
    <CustomModal
      isActive={isModalOpen}
      title={"Delete Item"}
      triggerComponent={
        <MaterialIcons
          name="delete"
          size={20}
          color="black"
          onPress={onTrigger}
        />
      }
      footerButtons={footerButtons}
      onCancel={closeModalHandler}
    >
      Are you sure you want to delete this item?
    </CustomModal>
  );
};
