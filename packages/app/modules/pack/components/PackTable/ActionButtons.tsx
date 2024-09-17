import { AddItem } from 'app/modules/item';
import { EditPackItemModal } from 'app/modules/pack';
import {
  ThreeDotsMenu,
  YStack,
  RButton,
  RText,
  RDropdownMenu,
  View,
  RIconButton,
} from '@packrat/ui';

import { Platform } from 'react-native';
// import { RDropdownMenu } from '../../../ZDropdown';
// import RIconButton from '../../../RIconButton';
import { ChevronDown } from '@tamagui/lucide-icons';
import { BaseAlert } from '@packrat/ui';
import React from 'react';
import { type Item } from '../../model';

type ModalName = 'edit' | 'delete';

interface ActionButtonsProps {
  item: Item;
  onDelete: (params: { itemId: string; packId: string }) => void;
  currentPack: any;
}

export default function ActionButtons({
  item,
  onDelete,
  currentPack,
}: ActionButtonsProps) {
  const [activeModal, setActiveModal] = React.useState<ModalName | null>(null);
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(
    null,
  );

  const openModal = (modalName: ModalName, itemId: string) => {
    setActiveModal(modalName);
    setSelectedItemId(itemId);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItemId(null);
  };

  const handleEditClick = () => {
    openModal('edit', item.id);
  };

  const handleDeleteClick = () => {
    openModal('delete', item.id);
  };

  return (
    <>
      <EditPackItemModal
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        triggerComponent={null}
        showTrigger={false}
      >
        {selectedItemId === item.id && (
          <AddItem
            id={item.id}
            packId={item.id}
            isEdit={true}
            initialData={item}
          />
        )}
      </EditPackItemModal>
      <BaseAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        hideIcon={true}
        title={'Delete Item'}
        footerButtons={[
          {
            label: 'Cancel',
            onClick: () => {
              closeModal();
            },
            color: 'gray',
            disabled: false,
          },
          {
            label: 'Delete',
            onClick: () => {
              closeModal();
              onDelete({ itemId: item.id, packId: currentPack.id });
            },
            color: '#B22222',
            disabled: false,
          },
        ]}
        footerComponent={null}
      >
        <RText> Are you sure you want to delete this item?</RText>
      </BaseAlert>

      {Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      window.innerWidth < 900 ? (
        <View>
          <RDropdownMenu
            menuItems={[
              { label: 'Edit', onSelect: handleEditClick },
              { label: 'Delete', onSelect: handleDeleteClick },
            ]}
            menuName={
              <RIconButton
                backgroundColor="transparent"
                icon={ChevronDown}
                style={{ padding: 0 }}
              />
            }
          />
        </View>
      ) : (
        <View>
          <ThreeDotsMenu>
            <YStack space="$1">
              <RButton onPress={handleEditClick}>Edit</RButton>
              <RButton onPress={handleDeleteClick}>Delete</RButton>
            </YStack>
          </ThreeDotsMenu>
        </View>
      )}
    </>
  );
}
