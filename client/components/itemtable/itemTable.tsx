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
import { loadStyles } from './itemsTable.style';

export const ItemsTable = ({
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
      />,
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
            data.map((item, index) => {
              return <TableItem key={index} itemData={item} />;
            })
          )}
        </Box>
      </Table>
      <Box style={loadStyles().paginationWrapper}>
        <PaginationLimit limit={limit} setLimit={setLimit} setPage={setPage} />
        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            style={{
              marginRight: '10px',
              width: '4px',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              borderColor: page === 1 ? 'gray' : '#0284c7',
              borderWidth: '1px',
              borderStyle: 'solid',
              pointerEvents: page === 1 ? 'none' : 'auto',
            }}
            disabled={page === 1}
            onPress={handlePreviousPage}
          >
            {/* extract the page checking logic and make it generic */}
            <Text style={{ color: page === 1 ? 'gray' : '#0284c7' }}>
              {'<'}
            </Text>
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
              pointerEvents: page === totalPages ? 'none' : 'auto',
            }}
            disabled={page === totalPages}
            onPress={handleNextPage}
          >
            <div style={{ color: page === totalPages ? 'gray' : '#0284c7' }}>
              {'>'}
            </div>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
