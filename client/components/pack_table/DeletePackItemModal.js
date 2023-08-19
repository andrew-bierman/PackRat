import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deletePackItem } from "../../store/packsStore";
import { CustomModal } from "../modal";
import { deleteGlobalItem, deleteItemOffline } from "../../store/globalItemsStore";
import { isConnected } from "~/utils/netInfo";
import { InformUser } from "~/utils/ToastUtils";
import { addOfflineRequest } from '../../store/offlineRequest'
export const DeletePackItemModal = ({ itemId, pack, refetch, setRefetch = () => {} }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const closeModalHandler = () => setIsModalOpen(false);

  const onTrigger = () => {
    setIsModalOpen(true);
  };

  const deleteItemHandler =async () => {
    const connected = await isConnected();
    console.log("🚀 ~ file: DeletePackItemModal.js:34 ~ deleteItemHandler ~ connected:", connected)
    if (pack) {
      if(connected) 
        dispatch(deletePackItem({ itemId, currentPackId: pack["_id"] }));
      else 
        console.log('Deleting in offline mode');
    } else {
      if(connected) {
        // connected to wifi
        dispatch(deleteGlobalItem(itemId));
        setRefetch(refetch === true ? false : true);
      } else {
        dispatch(deleteItemOffline(itemId));
        dispatch(addOfflineRequest({ method : 'deleteItem', data : itemId }))
        // not connected to wifi
      }
      console.log('global item detected');
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
