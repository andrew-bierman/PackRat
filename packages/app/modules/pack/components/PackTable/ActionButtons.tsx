import { AddItem } from 'app/modules/item';
import { EditPackItemModal } from 'app/modules/pack';
import { RText, View, ActionsDropdownComponent } from '@packrat/ui';

import { Platform } from 'react-native';
// import { RDropdownMenu } from '../../../ZDropdown';
// import RIconButton from '../../../RIconButton';
import { ChevronDown } from '@tamagui/lucide-icons';
import { BaseAlert } from '@packrat/ui';
import React from 'react';
import { type Item } from '../../../item/model';

type ModalName = 'edit' | 'delete';

interface ActionButtonsProps {
  item: Item;
  onDelete: (params: { itemId: string; packId: string }) => void;
  currentPack: any;
  isOwner: boolean;
}

interface optionValues {
  label: string;
  value: string;
}

export default function ActionButtons({
  item,
  onDelete,
  currentPack,
  isOwner,
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

  const handleActionsOpenChange = (state) => {
    switch (state) {
      case 'Edit':
        openModal('edit', item.id);
        break;
      case 'Delete':
        openModal('delete', item.id);
        break;
    }
  };

  const optionValues: optionValues[] = [
    { label: 'Edit', value: 'Edit' },
    { label: 'Delete', value: 'Delete' },
  ];

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
        footerComponent={undefined}
      >
        <RText> Are you sure you want to delete this item?</RText>
      </BaseAlert>

      <View
        style={{
          minWidth: 50,
          maxWidth: 100,
        }}
      >
        <ActionsDropdownComponent
          value={null}
          data={optionValues}
          onValueChange={(value) => handleActionsOpenChange(value)}
          native={true}
        />
      </View>
    </>
  );
}
