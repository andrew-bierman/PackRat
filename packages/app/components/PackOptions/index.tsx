/* eslint-disable react/react-in-jsx-scope */
import { RStack, RIconButton, BaseModal, View } from '@packrat/ui';
import { Entypo } from '@expo/vector-icons';
import { useModalState } from './useModalState';
import { Text } from 'react-native';

interface IPackOptions {
  Edit: React.ReactNode;
  Delete: React.ReactNode;
  Ignore: React.ReactNode;
  isOpen?: boolean | undefined;
  hideIcon?: boolean;
  toggle?: Function | undefined;
}

export const PackOptions = ({
  Edit,
  Delete,
  Ignore,
  isOpen,
  hideIcon = false,
  toggle,
}: IPackOptions) => {
  const { isModalOpen, openModal, closeModal } = useModalState();

  return (
    <RStack>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        hideIcon={hideIcon}
        onClose={closeModal}
        triggerComponent={<MenuTriggerComponent openModal={openModal} />}
      >
        {Edit && (
          <RStack style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{Edit} Edit</Text>
          </RStack>
        )}
        {Delete && (
          <RStack style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text> {Delete}Delete </Text>
          </RStack>
        )}
        <RStack
          style={{
            width: 200,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>{Ignore}</Text>
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
