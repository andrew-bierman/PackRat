import { Pressable } from "react-native";
import React from "react";
import { Box, Menu, ThreeDotsIcon } from "native-base";
import { useDispatch } from "react-redux";
import { deletePack } from "../../store/packsStore";
import { useRouter } from "expo-router";
export const ThreeDotsMenu = ({ data, titleRef, setEditTitle }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Box h="80%" w="90%">
      <Menu
        w="120"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <ThreeDotsIcon />
            </Pressable>
          );
        }}
      >
        <Menu.Item
          onPress={() => {
            setEditTitle(true);
            if (titleRef.current) {
              titleRef.current.style =
                "font-size:20px !important;font-weight:bold;color: #22c67c; border:1px solid black;";
            }
          }}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          onPress={() => {
            dispatch(
              deletePack({
                id: data["_id"],
              })
            );
            router.replace("/feed");
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    </Box>
  );
};
