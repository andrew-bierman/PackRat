import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useState } from 'react';
import { Row } from 'react-native-table-component';
import { DeletePackItemModal } from './DeletePackItemModal';
import { EditPackItemModal } from './EditPackItemModal';
import { formatNumber } from 'app/utils/formatNumber';
import { AddItem } from 'app/modules/item';
import { loadStyles } from './packtable.style';
import {
  RText,
  // ZDropdown
} from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';

type ModalName = 'edit' | 'delete' | null;

interface TableItemProps {
  itemData: any;
  handleCheckboxChange: (itemId: string) => void;
  onDelete: (params: { itemId: string; packId: string }) => void;
  index?: number;
  hasPermissions: boolean;
  flexArr: number[];
  currentPack: any;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropDownItems {
  label: string;
  onSelect: () => void;
}

const TableItem = ({
  itemData,
  onDelete,
  hasPermissions,
  flexArr,
  currentPack,
  refetch,
  setRefetch = () => {},
}: TableItemProps) => {
  const { name, weight, quantity, unit, id } = itemData;
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const styles = useCustomStyles(loadStyles);
  const authUser = useAuthUser();

  useEffect(() => {
    setActiveModal(null);
  }, [itemData]);

  const openModal = (modalName: ModalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  let rowActionItems: DropDownItems[] = [
    { label: 'Delete', onSelect: () => openModal('delete') },
    // TODO Implement Ignore Pack Item functional
    // { label: 'Ignore', onSelect: () => {} },
  ];

  if (authUser && itemData && authUser.id === itemData.ownerId) {
    rowActionItems = [
      {
        label: 'Edit',
        onSelect: () => openModal('edit'),
      },
      ...rowActionItems,
    ];
  }

  let rowData = [
    <RText px={8}>{name}</RText>,
    <RText px={0}>{`${formatNumber(weight)} ${unit}`}</RText>,
    <RText px={0}>{quantity}</RText>,
  ];
  if (hasPermissions) {
    if (
      Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      window.innerWidth < 900
    ) {
      // Remove ZDropdown usage
      // rowData.push(<ZDropdown.Native dropdownItems={rowActionItems} />);
    } else {
      // Remove ZDropdown usage
      // rowData.push(<ZDropdown.Web dropdownItems={rowActionItems} />);
    }
  }

  /*
  * this id is passed as pack id but it is a item id which is confusing
  Todo need to change the name for this passing argument and remaining functions which are getting it
   */

  // Here, you can set a default category if item.category is null or undefined
  return (
    <>
      <EditPackItemModal
        triggerComponent={undefined}
        showTrigger={false}
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
      >
        <AddItem id={id} packId={id} isEdit={true} initialData={itemData} />
      </EditPackItemModal>
      <DeletePackItemModal
        onConfirm={() => onDelete({ itemId: id, packId: currentPack.id })}
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
      />
      <Row data={rowData} style={styles.row} flexArr={flexArr} />
    </>
  );
};

export default TableItem;
