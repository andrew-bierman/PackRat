import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { Cell, Row, Table } from 'react-native-table-component';
import { PackOptions } from '../PackOptions';
import { DeletePackItemModal } from './DeletePackItemModal';
import { EditPackItemModal } from './EditPackItemModal';
import { formatNumber } from 'app/utils/formatNumber';
import { AddItem } from '../item/AddItem';
import loadStyles from './packtable.style';
import { IgnoreItemCheckbox } from './TableHelperComponents';

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
  const { name, weight, quantity, category, unit, id } = itemData;
  const styles = useCustomStyles(loadStyles);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  /**
   * Executes the onTrigger function.
   *
   * @param {None} None - No parameters required.
   * @return {None} No return value.
   */
  const onTrigger = () => {
    setIsEditModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsEditModalOpen(false);
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
      category.name,
      <PackOptions
        Edit={
          <EditPackItemModal>
            <AddItem
              id={id}
              packId={currentPack.id}
              isEdit={true}
              initialData={itemData}
            />
          </EditPackItemModal>
        }
        Delete={
          <DeletePackItemModal
            itemId={id}
            pack={currentPack}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        }
        Ignore={
          <IgnoreItemCheckbox
            itemId={id}
            isChecked={checkedItems.includes(id)}
            handleCheckboxChange={handleCheckboxChange}
          />
        }
        editTrigger={onTrigger}
      />,
    ];
  } else {
    rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      category.name,
      <EditPackItemModal>
        <AddItem
          id={id}
          packId={currentPack.id}
          isEdit={true}
          currentPack={currentPack}
          initialData={itemData}
        />
      </EditPackItemModal>,
      <DeletePackItemModal
        itemId={id}
        pack={currentPack}
        refetch={refetch}
        setRefetch={setRefetch}
      />,
      <IgnoreItemCheckbox
        itemId={id}
        isChecked={checkedItems.includes(id)}
        handleCheckboxChange={handleCheckboxChange}
      />,
    ];
  }

  /*
  * this id is passed as pack id but it is a item id which is confusing
  Todo need to change the name for this passing argument and remaining functions which are getting it
   */

  // Here, you can set a default category if item.category is null or undefined
  return <Row data={rowData} style={styles.row} flexArr={flexArr} />;
};

export default TableItem;
