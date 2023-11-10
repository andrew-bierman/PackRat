import { Text } from 'react-native';
import React from 'react';
import { Table, Row, Cell } from 'react-native-table-component';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { Box, Button, HStack } from 'native-base';
import { formatNumber } from '../../utils/formatNumber';
import { EditPackItemModal } from '../pack_table/EditPackItemModal';
import { DeletePackItemModal } from '../pack_table/DeletePackItemModal';
import { PaginationLimit } from '../paginationChooseLimit';
import Loader from '../Loader';
import useCustomStyles from '~/hooks/useCustomStyles';

export const ItemsTable = ({
  limit,
  setLimit,
  page,
  setPage,
  data,
  isLoading,
  totalPages,
  refetch,
  setRefetch = () => {},
}) => {
  const flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const TitleRow = ({ title }) => {
    const rowData = [
      <HStack style={styles.mainTitle}>
        <Text style={styles.titleText}>{title}</Text>
      </HStack>,
    ];

    return (
      <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
    );
  };
  const TableItem = ({ itemData }) => {
    const { name, weight, category, quantity, unit, _id, type } = itemData;

    const rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      `${category?.name || type}`,
      <EditPackItemModal
        initialData={itemData}
        editAsDuplicate={false}
        setPage={setPage}
        page={page}
        refetch={refetch}
        setRefetch={setRefetch}
      />,
      <DeletePackItemModal
        itemId={_id}
        refetch={refetch}
        setRefetch={setRefetch}
      />,
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
    <Box
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
        <Box
          style={{
            height: '400px',
            overflowY: 'scroll',
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            data.globalItems.items.map((item, index) => {
              return <TableItem key={index} itemData={item} />;
            })
          )}
        </Box>
      </Table>
      <PaginationLimit limit={limit} setLimit={setLimit} setPage={setPage} />
      <Box style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
        <Button
          style={{
            marginRight: '10px',
            width: '4px',
            backgroundColor: 'transparent',
            borderRadius: '5px',
            borderColor: page < 2 ? 'gray' : '#0284c7',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          disabled={page < 2}
          onPress={handlePreviousPage}
        >
          <Text style={{ color: page < 2 ? 'gray' : '#0284c7' }}>{'<'}</Text>
        </Button>
        <Button
          style={{
            marginRight: '10px',
            width: '4px',
            backgroundColor: 'transparent',
            borderRadius: '5px',
            borderColor: page === totalPages ? 'gray' : '#0284c7',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          disabled={page === totalPages}
          onPress={handleNextPage}
        >
          <Text style={{ color: page === totalPages ? 'gray' : '#0284c7' }}>
            {'>'}
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      flex: 1,
      padding: 10,
      width: '100%',
    },
    tableStyle: {
      width: '100%',
      paddingHorizontal: 20,
    },
    mainTitle: {
      marginTop: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    categoryRow: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      height: 50,
      backgroundColor: currentTheme.colors.primary,
      borderRadius: 10,
      justifyContent: 'center',
      paddingLeft: 15,
    },
    titleText: {
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    head: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#D1D5DB',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    headerText: {
      fontWeight: 'bold',
      color: '#000000',
    },
    row: {
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#D1D5DB',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 25,
      backgroundColor: '#F8F8F8',
    },
    noItemsText: {
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 20,
      textAlign: 'center',
    },
  };
};
