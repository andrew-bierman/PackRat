import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deletePackItem } from "../../store/packsStore";
import { CustomModal } from "../modal";
import { deleteGlobalItem } from "../../store/globalItemsStore";
import { isConnected } from "~/utils/netInfo";
import { InformUser } from "~/utils/ToastUtils";
export const DeletePackItemModal = ({ itemId, pack, refetch, setRefetch = () => {} }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const closeModalHandler = () => setIsModalOpen(false);

  const onTrigger = () => {
    isConnected().then(connected => {
      if(connected) {
        setIsModalOpen(true);
      } else {
        InformUser({
          title : "You are not Connected to Internet",
          placement: "bottom",
          duration: 2000,
          style: {
            backgroundColor: "red",
          },
        })
      }
    })
  };

  const deleteItemHandler = () => {
    
    if (pack) {
      dispatch(deletePackItem({ itemId, currentPackId: pack["_id"] }));
    } else {
      dispatch(deleteGlobalItem(itemId));
      setRefetch(refetch === true ? false : true);
    }
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
