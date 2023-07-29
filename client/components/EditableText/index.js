import React, { useState } from "react";
import { TextInput } from "react-native";
import { theme } from "../../theme";
import { useDispatch } from "react-redux";
import { updatePack } from "../../store/packsStore";
export const EditableInput = ({
  data,
  title,
  editTitle,
  setEditTitle,
  titleRef,
}) => {
  const [headerTitle, setHeaderTitle] = useState(title || "");
  const dispatch = useDispatch();
  return (
    <TextInput
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        color: theme.colors.textPrimary,
      }}
      ref={titleRef}
      editable={editTitle}
      onChange={(e) => {
        setHeaderTitle(e.target.value);
      }}
      value={headerTitle}
      onBlur={() => {
        const packDetails = {
          _id: data["_id"],
          name: headerTitle,
          is_public: data.is_public,
        };
        console.log("updated", packDetails);
        setEditTitle(false);
        titleRef.current.style =
          "font-size:20px !important;font-weight:bold;color: #22c67c;";

        dispatch(updatePack(packDetails));
      }}
    />
  );
};
