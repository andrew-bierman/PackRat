import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { RStack, RIconButton, BaseModal } from '@packrat/ui';
import { Entypo } from '@expo/vector-icons';
export const PackOptions = ({ Edit, Delete, Ignore }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <View>
      <BaseModal triggerComponent={<MenuTriggerComponent />}>
        <RStack style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Edit} Edit{' '}
        </RStack>
        <RStack style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Delete} Delete{' '}
        </RStack>
        <RStack
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {Ignore}{' '}
        </RStack>
      </BaseModal>
    </View>
  );
};

const MenuTriggerComponent = ({ setIsModalOpen }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RIconButton
        backgroundColor="transparent"
        icon={<Entypo name="dots-three-horizontal" size={24} color="black" />}
        onPress={() => {
          setIsModalOpen(true);
        }}
      />
    </View>
  );
};
