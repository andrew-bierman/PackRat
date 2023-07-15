import { useEffect, useState } from "react";
import { Box, Input, Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { addPackItem, editPackItem } from "../../store/packsStore";
import { editItemsGlobalAsDuplicate } from "../../store/globalItemsStore";
import { ItemForm } from "./ItemForm"; // assuming you moved the form related code to a separate component
import { ItemCategoryEnum } from "../../constants/itemCategory";

export const AddItem = ({
  _id,
  isEdit,
  initialData,
  packId,
  currentPack,
  editAsDuplicate,
  setPage,
  page,
  closeModalHandler,
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
    initialData?.category.name || ""
  );

  const [unit, setUnit] = useState(initialData?.unit || "");

  // handle updates to initialData
  useEffect(() => {
    setName(initialData?.name || "");
    setWeight(initialData?.weight?.toString() || "");
    setQuantity(initialData?.quantity?.toString() || "");
    setUnit(initialData?.unit || "");
  }, [initialData]);

  const handleSubmit = () => {
    if (isEdit) {
      if (packId) {
        dispatch(
          editItemsGlobalAsDuplicate({
            itemId: _id,
            packId,
            name,
            weight,
            quantity,
            unit,
            type: categoryType,
          })
        );
        setIsAddItemModalOpen(false);
      } else {
        console.log("here");
        dispatch(
          editPackItem({
            name,
            weight,
            quantity,
            unit,
            type: categoryType,
            _id: initialData["_id"],
          })
        );
        closeModalHandler();
      }
    } else {
      dispatch(
        addPackItem({
          name,
          weight,
          quantity,
          type: categoryType,
          unit,
          _id,
          packId,
        })
      );
      setIsAddItemModalOpen(false);
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
        categoryType={categoryType}
        setCategoryType={setCategoryType}
        currentPack={currentPack}
      />
    </Box>
  );
};
