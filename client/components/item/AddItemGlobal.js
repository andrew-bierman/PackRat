import { useEffect, useState } from "react";
import { Box, Input, Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { addPackItem, editPackItem } from "../../store/packsStore";
import { addItemsGlobal } from "../../store/globalItemsStore";

import { ItemForm } from "./ItemForm"; // assuming you moved the form related code to a separate component
import { ItemCategoryEnum } from "../../constants/itemCategory";

export const AddItemGlobal = ({
  isEdit,
  initialData,
  setIsAddItemModalOpen,
  setPage,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.items.isLoading);

  // Moved the state up to the parent component
  const [name, setName] = useState(initialData?.name || "");
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [quantity, setQuantity] = useState(
    initialData?.quantity?.toString() || ""
  );
  const [unit, setUnit] = useState(initialData?.unit || "");

  const [categoryType, setCategoryType] = useState("");

  const resetAddForm = () => {
    setName("");
    setCategoryType("");
    setWeight("");
    setQuantity("");
    setUnit("");
  };

  // handle updates to initialData
  useEffect(() => {
    setName(initialData?.name || "");
    setWeight(initialData?.weight?.toString() || "");
    setQuantity(initialData?.quantity?.toString() || "");
    setUnit(initialData?.unit || "");
  }, [initialData]);

  const handleSubmit = () => {
    // if(!_id) {
    //   console.log("no _id")
    //   return;
    // }

    if (isEdit) {
      dispatch(editPackItem({ name, weight, quantity, unit, _id, packId }));
      setIsAddItemModalOpen(false);
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
      resetAddForm();
      setIsAddItemModalOpen(false);
      setPage(1);
    }
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
        isEdit={isEdit}
      />
    </Box>
  );
};
