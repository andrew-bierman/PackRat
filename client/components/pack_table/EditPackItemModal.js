import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AddItem } from "../item/AddItem";
import { CustomModal } from "../modal";

export const EditPackItemModal = ({ initialData, packId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModalHandler = () => setIsModalOpen(false);

  const onTrigger = () => {
    setIsModalOpen(true);
  };

  console.log("initialData", initialData);

  const footerButtons = [
    {
      label: "Cancel",
      onClick: closeModalHandler,
      color: "danger",
      disabled: false,
    },
    // add more footer buttons here if needed
  ];

  return (
    <CustomModal
      isActive={isModalOpen}
      title={"Edit Item"}
      triggerComponent={
        <MaterialIcons
          name="edit"
          size={20}
          color="black"
          onPress={onTrigger}
        />
      }
      onTrigger={onTrigger}
      footerButtons={footerButtons}
      onCancel={closeModalHandler}
    >
      <AddItem _id={packId} isEdit={true} initialData={initialData} />
    </CustomModal>
  );
};
