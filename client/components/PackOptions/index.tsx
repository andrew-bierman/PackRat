import { Pressable } from 'react-native';
import React from 'react';
import { Box, Menu, ThreeDotsIcon } from 'native-base';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
export const PackOptions = ({ Edit, Delete, Ignore }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Box h="80%" w="90%">
      <Menu
        w="140"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <ThreeDotsIcon />
            </Pressable>
          );
        }}
      >
        <Menu.Item>{Edit} Edit </Menu.Item>
        <Menu.Item>{Delete} Delete </Menu.Item>
        <Menu.Item>{Ignore} Ignore </Menu.Item>
      </Menu>
    </Box>
  );
};
