import { View, Text, Pressable } from 'react-native'
import { Box, Button, Menu } from 'native-base'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export const DuplicateIcon = () => {
  return (
    <Button
      style={{
        backgroundColor: 'transparent',
        width: '10%',
        height: '10%',
        padding: 0,
        paddingLeft: 15
      }}
    >
      <MaterialIcons name="file-copy" size={24} color="gray" />
    </Button>
  )
}
