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
import useCustomStyles from '~/hooks/useCustomStyles';
import { loadStyles } from './itemsTable.style';
import { flexArr } from '~/hooks/itemtable';

export const ItemsTable = ({
  limit,
  setLimit,
  page,
  setPage,
  data,
  isLoading,
  totalPages,
}) => {
  const styles = useCustomStyles(loadStyles);
  const { TitleRow, TableItem, handleNextPage, handlePreviousPage } =
    useItemsTable({
      styles,
      page,
      setPage
    });

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
