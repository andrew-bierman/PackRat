import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'app/hooks/router';
import { RStack, RIconButton, BaseModal } from '@packrat/ui';
import { Entypo } from '@expo/vector-icons';
import { useModalState } from './useModalState';
import { View } from 'react-native';

interface PackOptionsProps {
  Edit: React.ReactNode;
  Delete: React.ReactNode;
  Ignore: React.ReactNode;
}

export const PackOptions: React.FC<PackOptionsProps> = ({
  Edit,
  Delete,
  Ignore,
}) => {
  const { isModalOpen, openModal, closeModal } = useModalState();

  return (
    <RStack>
      <BaseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerComponent={<MenuTriggerComponent openModal={openModal} />}
      >
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
    </RStack>
  );
};

const MenuTriggerComponent = ({ openModal }) => {
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
        onPress={openModal}
      />
    </View>
  );
};
