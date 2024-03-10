import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Row } from 'react-native-table-component';
import { PackOptions } from '../PackOptions';
import { DeletePackItemModal } from './DeletePackItemModal';
import { EditPackItemModal } from './EditPackItemModal';
import { formatNumber } from 'app/utils/formatNumber';
import { AddItem } from '../item/AddItem';
import loadStyles from './packtable.style';
import { IgnoreItemCheckbox } from './TableHelperComponents';
import { DropdownMenu } from '@packrat/ui';
import { AntDesign } from '@expo/vector-icons';

interface ITableItem {
  itemData: any;
  checkedItems: string[];
  handleCheckboxChange: (itemId: string) => void;
  index: number;
  flexArr: number[];
  currentPack: any;
  refetch: () => void;
  setRefetch: () => void;
}

const DropDown = ({ toggleDelete, toggleEdit, toggleIgnore }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <View key="viewContainer" style={styles.dropdownContainer}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <AntDesign name="circledown" size={16} color="black" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item key="edit" onSelect={toggleEdit}>
            <DropdownMenu.ItemTitle>Edit</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="delete" onSelect={toggleDelete}>
            <DropdownMenu.ItemTitle>Delete</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="ignore" onSelect={toggleIgnore}>
            <DropdownMenu.ItemTitle>Ignore</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </View>
  );
};

const TableItem = ({
  itemData,
  checkedItems,
  handleCheckboxChange,
  index,
  flexArr,
  currentPack,
  refetch,
  setRefetch = () => {},
}: ITableItem) => {
  const { name, weight, quantity, unit, _id } = itemData;
  const styles = useCustomStyles(loadStyles);

  const [isEditModalVisible, setEditModalVisible] = useState(undefined);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(undefined);
  const [isIgnoreModalVisible, setIgnoreModalVisible] = useState(undefined);

  const toggleEdit = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const toggleDelete = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };
  const toggleIgnore = () => {
    setIgnoreModalVisible(!isIgnoreModalVisible);
  };

  const rowData = [
    <Text key="name" style={styles.rowText}>
      {name}
    </Text>,
    <Text key="weight" style={styles.rowText}>
      {`${formatNumber(weight)} ${unit}`}
    </Text>,
    <Text key="quantity" style={styles.rowText}>
      {quantity}
    </Text>,
    <DropDown
      key="dropdown"
      toggleEdit={toggleEdit}
      toggleDelete={toggleDelete}
      toggleIgnore={toggleIgnore}
    />,
  ];

  /*
  * this _id is passed as pack id but it is a item id which is confusing
  Todo need to change the name for this passing argument and remaining functions which are getting it
   */

  // Here, you can set a default category if item.category is null or undefined
  return (
    <>
      {isEditModalVisible && (
        <EditPackItemModal
          hideIcon={true}
          isOpen={isEditModalVisible}
          toggle={toggleEdit}
        >
          {Platform.OS === 'android' ||
          Platform.OS === 'ios' ||
          window.innerWidth < 900 ? (
            <AddItem
              _id={_id}
              packId={_id}
              isEdit={true}
              initialData={itemData}
            />
          ) : (
            <AddItem
              _id={_id}
              packId={_id}
              isEdit={true}
              currentPack={currentPack}
              initialData={itemData}
            />
          )}
        </EditPackItemModal>
      )}
      {isDeleteModalVisible && (
        <DeletePackItemModal
          toggle={toggleDelete}
          hideIcon={true}
          isOpen={isDeleteModalVisible}
          key="deleteModal"
          itemId={_id}
          pack={currentPack}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      )}

      {isIgnoreModalVisible && (
        <PackOptions
          isOpen={isIgnoreModalVisible}
          toggle={toggleIgnore}
          hideIcon={true}
          Ignore={
            Platform.OS === 'android' ||
            Platform.OS === 'ios' ||
            window.innerWidth < 900 ? (
              <IgnoreItemCheckbox
                itemId={_id}
                isChecked={checkedItems.includes(_id)}
                handleCheckboxChange={handleCheckboxChange}
              />
            ) : (
              <IgnoreItemCheckbox
                itemId={_id}
                isChecked={checkedItems.includes(_id)}
                handleCheckboxChange={handleCheckboxChange}
              />
            )
          }
        />
      )}
      <Row data={rowData} style={styles.row} flexArr={flexArr} />
    </>
  );
};

export default TableItem;
