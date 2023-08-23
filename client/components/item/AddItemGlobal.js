import { useState } from "react";
import { Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { addItemsGlobal } from "../../store/globalItemsStore";

import { ItemForm } from "./ItemForm"; // assuming you moved the form related code to a separate component

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

  /**
   * Resets the add form by setting all the input values to an empty string.
   */
  const resetAddForm = () => {
    setName("");
    setCategoryType("");
    setWeight("");
    setQuantity("");
    setUnit("");
  };

  // handle updates to initialData

/**
 * Handles the form submission.
 *
 * @return {void}
 */
  const handleSubmit = () => {
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
    setRefetch(refetch === true ? false : true);
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
