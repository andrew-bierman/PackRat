import { useEffect, useState } from "react";
import { Box, Input, Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { addPackItem, editPackItem } from "../../store/packsStore";
import { editItemsGlobalAsDuplicate } from "../../store/packsStore";
import { ItemForm } from "./ItemForm"; // assuming you moved the form related code to a separate component
import { ItemCategoryEnum } from "../../constants/itemCategory";
import {
  addNewSinglePack,
  updateExistingSinglePack,
} from "../../store/singlePackStore";

export const AddItem = ({
  _id,
  isEdit,
  initialData,
  packId,
  currentPack,
  editAsDuplicate,
  setPage = () => {},
  page,
  closeModalHandler,
  setIsAddItemModalOpen = () => {},
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.packs.isLoading);

  // Moved the state up to the parent component
  const [name, setName] = useState(initialData?.name || "");
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [quantity, setQuantity] = useState(
    initialData?.quantity?.toString() || ""
  );
  const [categoryType, setCategoryType] = useState(
    initialData?.category?.name || ""
  );

  const [unit, setUnit] = useState(initialData?.unit || "");

  // handle updates to initialData
  useEffect(() => {
    setName(initialData?.name || "");
    setWeight(initialData?.weight?.toString() || "");
    setQuantity(initialData?.quantity?.toString() || "");
    setUnit(initialData?.unit || "");
  }, [initialData]);

  const clearState = () => {
    setName("");
    setWeight("");
    setQuantity("");
    setCategoryType("");
    setUnit("");
  };

  const handleSubmit = () => {
    console.log("initial", initialData);
    if (isEdit) {
      if (packId && initialData.global) {
        console.log("editing", packId);
        const newItem = {
          itemId: _id,
          packId,
          name,
          weight,
          quantity,
          unit,
          type: categoryType,
        };

        dispatch(updateExistingSinglePack(newItem));
        dispatch(editItemsGlobalAsDuplicate(newItem));
        closeModalHandler();
      } else {
        const newItem = {
          name,
          weight,
          quantity,
          unit,
          type: categoryType,
          _id: initialData["_id"],
        };
        dispatch(updateExistingSinglePack(newItem));
        dispatch(editPackItem(newItem));
        setPage(1);
        closeModalHandler();
      }
    } else {
      const newItem = {
        name,
        weight,
        quantity,
        type: categoryType,
        unit,
        _id,
        packId,
      };
      dispatch(addNewSinglePack(newItem));
      dispatch(addPackItem(newItem));
      setIsAddItemModalOpen(false);
    }
    clearState();
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
        categoryType={categoryType}
        setCategoryType={setCategoryType}
        currentPack={currentPack}
      />
    </Box>
  );
};
