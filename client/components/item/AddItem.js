import { useEffect, useState } from "react";
import { Box, Input, Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { addPackItem, editPackItem } from "../../store/packsStore";

import { ItemForm } from "./ItemForm"; // assuming you moved the form related code to a separate component

export const AddItem = ({ _id, isEdit, initialData, packId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.packs.isLoading);

  // Moved the state up to the parent component
  const [name, setName] = useState(initialData?.name || "");
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [quantity, setQuantity] = useState(initialData?.quantity?.toString() || "");
  const [unit, setUnit] = useState(initialData?.unit || "");

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
      dispatch(editPackItem({ name, weight, quantity, unit, _id, packId}));
    } else {
      console.log("adding item")
      dispatch(addPackItem({ name, weight, quantity, unit, _id, packId }));
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
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEdit={isEdit}
      />
    </Box>
  );
};
