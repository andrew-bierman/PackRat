import { useState } from "react";
import { Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { addItemOffline, addItemsGlobal } from "../../store/globalItemsStore";

import { ItemForm } from "./ItemForm"; // assuming you moved the form related code to a separate component
import { isConnected } from "~/utils/netInfo";
import { addOfflineRequest } from "../../store/offlineRequest";

export const AddItemGlobal = ({
  setIsAddItemModalOpen,
  setRefetch = () => {},
  refetch,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.items.isLoading);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const [categoryType, setCategoryType] = useState("");

  const resetAddForm = () => {
    setName("");
    setCategoryType("");
    setWeight("");
    setQuantity("");
    setUnit("");
  };

  // handle updates to initialData

  const handleSubmit =async () => {
    const connected = await isConnected();
    if(!connected) {
      console.warn('You are offline');
      const item ={ name, weight, quantity, type: categoryType,unit,}
      dispatch(addItemOffline({...item, weight: Number(item.weight)}));
      dispatch(addOfflineRequest({ method : 'addGlobalItem', data:item}));
    } else {
    dispatch(
      addItemsGlobal({
        name,
        weight,
        quantity,
        type: categoryType,
        unit,
      })
    );
    setRefetch(refetch === true ? false : true);
  }
  resetAddForm();
  setIsAddItemModalOpen(false);
  };

  return (
    <Box>
      <ItemForm
        name={name}
        setName={setName}
        weight={weight}
        setWeight={setWeight}
        quantity={quantity}
        setQuantity={setQuantity}
        unit={unit}
        setUnit={setUnit}
        categoryType={categoryType}
        setCategoryType={setCategoryType}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Box>
  );
};
