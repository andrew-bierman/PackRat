import React, { useState,useEffect } from "react";
import { TextInput } from "react-native";
import { theme } from "../../theme";
import { useDispatch } from "react-redux";
import { updatePack } from "../../store/packsStore";
import { editTrip } from "../../store/tripsStore";

export const EditableInput = ({
  data,
  title,
  editTitle,
  setEditTitle,
  titleRef,
}) => {
  const [headerTitle, setHeaderTitle] = useState(title || "");
  
  useEffect(() => {
    setHeaderTitle(title);
  }, [title])
  
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
        if (data.type === "pack") {
          const packDetails = {
            _id: data["_id"],
            name: headerTitle,
            is_public: data.is_public,
          };
          setEditTitle(false);
          titleRef.current.style =
            "font-size:20px !important;font-weight:bold;color: #22c67c;";

          dispatch(updatePack(packDetails));
        } else {
          const tripDetails = {
            _id: data["_id"],
            name: headerTitle,
            is_public: data.is_public,
          };
          setEditTitle(false);
          titleRef.current.style =
            "font-size:20px !important;font-weight:bold;color: #22c67c;";

          dispatch(editTrip(tripDetails));
        }
      }}
    />
  );
};
