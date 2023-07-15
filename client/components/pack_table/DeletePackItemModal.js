import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deletePackItem } from "../../store/packsStore";
import { CustomModal } from "../modal";
import { deleteGlobalItem } from "../../store/globalItemsStore";

export const DeletePackItemModal = ({ itemId, pack, setPage, page }) => {
  let currentPackId;
  if (pack) {
    currentPackId = pack["_id"];
  }

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const closeModalHandler = () => setIsModalOpen(false);

  const onTrigger = () => {
    setIsModalOpen(true);
  };

  const deleteItemHandler = () => {
    dispatch(deleteGlobalItem(itemId));
    setPage(page === 0 ? 1 : 0);
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
