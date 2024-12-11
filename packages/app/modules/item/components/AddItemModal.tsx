import React from 'react';
import { AddItem } from './AddItem';
import useTheme from 'app/hooks/useTheme';
import { BaseModal } from '@packrat/ui';
import { RText } from '@packrat/ui';
import { View } from 'react-native';

interface AddItemModalProps {
  currentPackId: string;
  currentPack: any;
  isAddItemModalOpen: boolean;
  setIsAddItemModalOpen: any;
  setRefetch?: () => void;
  showTrigger: boolean;
  initialData: any;
}

export const AddItemModal = ({
  currentPackId,
  currentPack,
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  showTrigger = true,
  setRefetch = () => {},
  initialData,
}: AddItemModalProps) => {
  const { currentTheme } = useTheme();

  const CustomTriggerButton = (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <RText
        style={{
          color: currentTheme.colors.text,
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        + Add Item
      </RText>
    </View>
  );

  return (
    <BaseModal
      title="Add Item"
      triggerComponent={CustomTriggerButton}
      showTrigger={showTrigger}
      footerButtons={[
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: (_, closeModal) => closeModal(),
        },
      ]}
      footerComponent={undefined}
      isOpen={isAddItemModalOpen}
      onOpen={() => setIsAddItemModalOpen(true)}
      onClose={() => setIsAddItemModalOpen(false)}
    >
      <AddItem
        initialData={initialData}
        packId={currentPackId}
        currentPack={currentPack}
        setRefetch={setRefetch}
        closeModalHandler={() => setIsAddItemModalOpen(false)}
      />
    </BaseModal>
  );
};
