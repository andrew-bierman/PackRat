import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemsGlobal, selectItemsGlobal } from "../store/globalItemsStore";

const ItemPicker = ({ currentPack, refetch, setRefetch }) => {
  const [selectedValue, setSelectedValue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsGlobal({ limit: undefined, page: undefined }));
  }, []);

  const data = useSelector((state) => state.globalItems);
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (selectedValue) {
      dispatch(
        selectItemsGlobal({
          selectedItem: selectedValue,
          ownerId: auth["_id"],
          packId: currentPack,
        })
      );
      setRefetch(refetch === true ? false : true);
    }
  }, [selectedValue]);

  return (
    <Select
      placeholder="select from globally available items"
      width={"100%"}
      selectedValue={"Key0"}
      onValueChange={(value) => {
        setSelectedValue(value);
      }}
    >
      {data &&
        data.globalItems.items &&
        data.globalItems.items.map((item, index) => {
          console.log("item", item);
          return (
            <Select.Item
              key={index}
              label={`${item.name} : ${item.quantity} * ${item.weight} ${item.unit} : ${item.category.name}`}
              value={item._id}
            />
          );
        })}
    </Select>
  );
};

export default ItemPicker;
