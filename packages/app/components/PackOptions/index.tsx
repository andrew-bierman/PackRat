import { useState } from 'react';
import { useRouter } from 'app/hooks/router';
import { RStack, RIconButton, BaseModal, View } from '@packrat/ui';
import { Entypo } from '@expo/vector-icons';
export const PackOptions = ({ Edit, Delete, Ignore }) => {
  const router = useRouter();
  return (
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
