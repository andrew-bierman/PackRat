import React from 'react';
import * as DropdownMenu from 'zeego/dropdown-menu'
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { RIconButton } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useState } from 'react';
import { FlatList, Platform, View, Text } from 'react-native';
import { Cell, Row, Table } from 'react-native-table-component';
import { PackOptions } from '../PackOptions';
import { DeletePackItemModal } from './DeletePackItemModal';
import { EditPackItemModal } from './EditPackItemModal';
import { formatNumber } from 'app/utils/formatNumber';
import { AddItem } from '../item/AddItem';
import loadStyles from './packtable.style';
import { IgnoreItemCheckbox } from './TableHelperComponents';
type ItemProps = React.ComponentProps<typeof DropdownMenu['Item']>
const DropdownMenuItem = DropdownMenu.create((props: ItemProps) => {
  return <DropdownMenu.Item {...props}>
    <Text>Hello world</Text>
  </DropdownMenu.Item>
}, 'Item')
 
type ModalName = 'edit' | 'delete';

interface TableItemProps {
  itemData: any;
  checkedItems: string[];
  handleCheckboxChange: (itemId: string) => void;
  index: number;
  flexArr: number[];
  currentPack: any;
  refetch: () => void;
  setRefetch: () => void;
}

const TableItem = ({
  itemData,
  checkedItems,
  handleCheckboxChange,
  index,
  flexArr,
  currentPack,
  refetch,
  setRefetch = () => {},
}: TableItemProps) => {
  const { name, weight, quantity, unit, _id } = itemData;
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const styles = useCustomStyles(loadStyles);

  const openModal = (modalName: ModalName) => () => {
    setActiveModal(modalName);
  }

  const closeModal = () => {
    setActiveModal(null)
  };

  let rowData = [];
  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    window.innerWidth < 900
  ) {
    rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RIconButton
          backgroundColor="transparent"
          icon={<MaterialIcons name="more-horiz" size={25} />}
          onPress={openModal}
          style={{ padding: 0}}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="Edit" onSelect={openModal('edit')}>
          <DropdownMenu.ItemTitle>Edit</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        <DropdownMenu.Item key="Delete" onSelect={openModal('delete')}>
          <DropdownMenu.ItemTitle>Delete</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="Ignore">
          <DropdownMenu.ItemTitle>Ignore</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    ];
  } else {
    rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      <EditPackItemModal>
        <AddItem
          _id={_id}
          packId={_id}
          isEdit={true}
          currentPack={currentPack}
          initialData={itemData}
        />
      </EditPackItemModal>,
      <DeletePackItemModal
        itemId={_id}
        pack={currentPack}
        refetch={refetch}
        setRefetch={setRefetch}
      />,
      <IgnoreItemCheckbox
        itemId={_id}
        isChecked={checkedItems.includes(_id)}
        handleCheckboxChange={handleCheckboxChange}
      />,
    ];
  }

  /*
  * this _id is passed as pack id but it is a item id which is confusing
  Todo need to change the name for this passing argument and remaining functions which are getting it
   */

  // Here, you can set a default category if item.category is null or undefined
  return <>
  <View style={{position: 'absolute'}}>
    <EditPackItemModal isOpen={activeModal === 'edit'} onClose={closeModal}>
        <AddItem
          _id={_id}
          packId={_id}
          isEdit={true}
          initialData={itemData}
        />
      </EditPackItemModal>
      <DeletePackItemModal
          itemId={_id}
          pack={currentPack}
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
        />
  </View>
  <Row data={rowData} style={styles.row} flexArr={flexArr} />
  </>;
};

export default TableItem;
