import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Table, Row, Cell } from 'react-native-table-component';
import { AntDesign } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { RButton, RStack } from '@packrat/ui';
import { formatNumber } from '../../utils/formatNumber';
import { EditPackItemModal } from '../pack_table/EditPackItemModal';
import { DeletePackItemModal } from '../pack_table/DeletePackItemModal';
import { PaginationLimit } from '../paginationChooseLimit';
import Loader from 'app/components/Loader';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './itemsTable.style';
import { AddItem } from '../item/AddItem';
import { DropdownMenu, RScrollView } from '@packrat/ui';

interface ItemsTableProps {
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  data: YourItemType[];
  isLoading: boolean;
  totalPages: number;
}

interface YourItemType {
  global: string;
  name: string;
  weight: number;
  category?: { name: string };
  quantity: number;
  unit: string;
  _id: string;
  type: string;
}

interface TitleRowProps {
  title: string;
}

interface TableItemProps {
  itemData: YourItemType;
}

const DropDown = ({ toggleDelete, toggleEdit }) => {
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
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </View>
  );
};

export const ItemsTable = ({
  limit,
  setLimit,
  page,
  setPage,
  data,
  isLoading,
  totalPages,
}: ItemsTableProps) => {
  const flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const TitleRow = ({ title }: TitleRowProps) => {
    const rowData = [
      <RStack
        key="rowData"
        style={{ flexDirection: 'row', ...styles.mainTitle }}
      >
        <Text style={styles.titleText}>{title}</Text>
      </RStack>,
    ];

    return (
      <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
    );
  };
  const TableItem = ({ itemData }: TableItemProps) => {
    const { name, weight, category, quantity, unit, _id, type } = itemData;

    const [isEditModalVisible, setEditModalVisible] = useState(undefined);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(undefined);

    const toggleEdit = () => {
      setEditModalVisible(!isEditModalVisible);
    };

    const toggleDelete = () => {
      setDeleteModalVisible(!isDeleteModalVisible);
    };

    const rowData = [
      <Text style={styles.rowText} key="name">
        {name}
      </Text>,
      <Text
        style={styles.rowText}
        key="weight"
      >{`${formatNumber(weight)} ${unit}`}</Text>,
      <Text style={styles.rowText} key="quantity">
        {quantity}
      </Text>,
      <Text
        style={styles.rowText}
        key="category"
      >{`${category?.name || type}`}</Text>,
      <DropDown
        key="dropdown"
        toggleDelete={toggleDelete}
        toggleEdit={toggleEdit}
      />,
    ];
    return (
      <>
        <Row data={rowData} style={styles.row} flexArr={flexArr} />
        {isEditModalVisible && (
          <EditPackItemModal
            hideIcon={true}
            isOpen={isEditModalVisible}
            toggle={toggleEdit}
          >
            <AddItem
              _id={_id}
              isEdit={true}
              isItemPage
              initialData={itemData}
              editAsDuplicate={false}
              setPage={setPage}
              page={page}
            />
          </EditPackItemModal>
        )}
        {isDeleteModalVisible && (
          <DeletePackItemModal
            toggle={toggleDelete}
            hideIcon={true}
            itemId={_id}
            isOpen={isDeleteModalVisible}
          />
        )}
      </>
    );
  };
  /**
   * Handles the logic for navigating to the next page.
   *
   * @return {undefined} This function doesn't return anything.
   */
  const handleNextPage = () => {
    setPage(page + 1);
  };
  /**
   * Handles the action of going to the previous page.
   *
   * @return {undefined} There is no return value.
   */
  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <RScrollView>
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: 30,
          backgroundColor: '#fff',
          marginTop: 20,
        }}
      >
        <Table>
          <TitleRow title="Global Items List" />
          <Row
            flexArr={flexArr}
            data={[
              'Item Name',
              'Weight',
              'Quantity',
              'Category',
              'Actions',
            ].map((header, index) => (
              <Cell key={index} data={header} textStyle={styles.headerText} />
            ))}
            style={styles.head}
          />
        </Table>
        <Table
          style={styles.tableStyle}
          borderStyle={{ borderColor: 'transparent' }}
        >
          <RScrollView style={{ height: 400 }}>
            {isLoading ? (
              <Loader />
            ) : (
              data.map((item, index) => {
                return <TableItem key={index} itemData={item} />;
              })
            )}
          </RScrollView>
        </Table>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <RButton
            style={{
              width: 50,
              backgroundColor: '#0284c7',
              borderRadius: 5,
              borderColor: page < 2 ? 'gray' : '#0284c7',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
            disabled={page < 2}
            onPress={handlePreviousPage}
          >
            <AntDesign
              name="left"
              size={16}
              color={page < 2 ? 'gray' : 'white'}
            />
          </RButton>
          <RButton
            style={{
              marginLeft: 10,
              width: 50,
              backgroundColor: '#0284c7',
              borderRadius: 5,
              borderColor: page === totalPages ? 'gray' : 'white',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
            onPress={handleNextPage}
          >
            <AntDesign
              name="right"
              size={16}
              color={page === totalPages ? 'gray' : 'white'}
            />
          </RButton>
        </View>
      </View>
      <PaginationLimit limit={limit} setLimit={setLimit} setPage={setPage} />
    </RScrollView>
  );
};
