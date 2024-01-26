import React from 'react';
import { Text, View } from 'react-native';
import { Table, Row, Cell } from 'react-native-table-component';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { RButton, RStack } from '@packrat/ui';
import { formatNumber } from '../../utils/formatNumber';
import { EditPackItemModal } from '../pack_table/EditPackItemModal';
import { DeletePackItemModal } from '../pack_table/DeletePackItemModal';
import { PaginationLimit } from '../paginationChooseLimit';
import Loader from '../Loader';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './itemsTable.style';
import { AddItem } from '../item/AddItem';
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

export const ItemsTable: React.FC<ItemsTableProps> = ({
  limit,
  setLimit,
  page,
  setPage,
  data,
  isLoading,
  totalPages,
}) => {
  const flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const TitleRow: React.FC<TitleRowProps> = ({ title }) => {
    const rowData = [
      <RStack style={{ flexDirection: 'row', ...styles.mainTitle }}>
        <Text style={styles.titleText}>{title}</Text>
      </RStack>,
    ];

    return (
      <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
    );
  };
  const TableItem: React.FC<TableItemProps> = ({ itemData }) => {
    const { name, weight, category, quantity, unit, _id, type } = itemData;

    const rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      `${category?.name || type}`,
      <EditPackItemModal>
        <AddItem
          isEdit={true}
          initialData={itemData}
          editAsDuplicate={false}
          setPage={setPage}
          page={page}
        />
      </EditPackItemModal>,
      <DeletePackItemModal itemId={_id} />,
    ];
    return <Row data={rowData} style={styles.row} flexArr={flexArr} />;
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
    <View
      style={{
        marginTop: '2rem',
      }}
    >
      <Table
        style={styles.tableStyle}
        borderStyle={{ borderColor: 'transparent' }}
      >
        <TitleRow title="Global Items List" />
        <Row
          flexArr={flexArr}
          data={[
            'Item Name',
            'Weight',
            'Quantity',
            'Category',
            'Edit',
            'Delete',
          ].map((header, index) => (
            <Cell key={index} data={header} textStyle={styles.headerText} />
          ))}
          style={styles.head}
        />
        <View
          style={{
            height: 400,
            overflowY: 'scroll',
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            data.map((item, index) => {
              return <TableItem key={index} itemData={item} />;
            })
          )}
        </View>
      </Table>
      <PaginationLimit limit={limit} setLimit={setLimit} setPage={setPage} />
      <View style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
        <RButton
          style={{
            marginRight: 10,
            width: 4,
            backgroundColor: 'transparent',
            borderRadius: 5,
            borderColor: page < 2 ? 'gray' : '#0284c7',
            borderWidth: 1,
            borderStyle: 'solid',
          }}
          disabled={page < 2}
          onPress={handlePreviousPage}
        >
          <Text style={{ color: page < 2 ? 'gray' : '#0284c7' }}>{'<'}</Text>
        </RButton>
        <RButton
          style={{
            marginRight: 10,
            width: 4,
            backgroundColor: 'transparent',
            borderRadius: 5,
            borderColor: page === totalPages ? 'gray' : '#0284c7',
            borderWidth: 1,
            borderStyle: 'solid',
          }}
          disabled={page === totalPages}
          onPress={handleNextPage}
        >
          <View style={{ color: page === totalPages ? 'gray' : '#0284c7' }}>
            {'>'}
          </View>
        </RButton>
      </View>
    </View>
  );
};
