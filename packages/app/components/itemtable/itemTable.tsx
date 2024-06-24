import React from 'react';
import { Dimensions, Platform, ScrollView, Text, View } from 'react-native';
import { Table, Row, Cell } from 'react-native-table-component';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { formatNumber } from '../../utils/formatNumber';
import { EditPackItemModal } from '../pack_table/EditPackItemModal';
import { DeletePackItemModal } from '../pack_table/DeletePackItemModal';
import { PaginationLimit } from '../paginationChooseLimit';
import Loader from '../Loader';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './itemsTable.style';
import { AddItem } from '../item/AddItem';
import { useDeleteItem } from 'app/hooks/items';
import { useAuthUser } from 'app/auth/hooks';
import Layout from 'app/components/layout/Layout';
import { RButton, RStack, RText } from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import { useScreenWidth } from 'app/hooks/common/useScreenWidth';


interface ItemsTableProps {
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  data: ItemType[];
  isLoading: boolean;
  totalPages: number;
}

interface ItemType {
  global: string;
  name: string;
  weight: number;
  category?: { name: string };
  quantity: number;
  unit: string;
  id: string;
  type: string;
  ownerId: string;
}

interface TitleRowProps {
  title: string;
}

interface TableItemProps {
  itemData: ItemType;
}

export const ItemsTable = ({
  limit,
  setLimit,
  page,
  setPage,
  data,
  isLoading,
  totalPages,
}: ItemsTableProps) => {
  const flexArr = [1.5, 1, 1, 1, 0.65, 0.65, 0.65];
  const { xs, xxs, xxxs } =  useResponsive();
  const { handleDeleteItem } = useDeleteItem();

  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const TitleRow = ({ title }: TitleRowProps) => {
    const rowData = [
      <RStack style={{ flexDirection: 'row', ...styles.mainTitle }}>
        <Text style={styles.titleText}>{title}</Text>
      </RStack>,
    ];

    return (
      <Row data={rowData} style={styles.title} textStyle={styles.titleText} />
    );
  };
  const TableItem = ({ itemData }: TableItemProps) => {
    const { name, weight, category, quantity, unit, id, type, ownerId } =
      itemData;
    const authUser = useAuthUser();

    const rowData = [
      <RText
        style={{
          color: isDark ? 'white' : 'black',
          fontSize:15,
        }}
      >
        {name}
      </RText>,
      <RText style={{ color: isDark ? 'white' : 'black' }}>
        {formatNumber(weight)} {unit}
      </RText>,
      <RText style={{ color: isDark ? 'white' : 'black' }}>{quantity}</RText>,
      <RText
        style={{
          color: isDark ? 'white' : 'black',
          fontSize:15,
        }}
      >
        {category?.name || type}
      </RText>,
    ];
    return (
      <Row
        data={rowData}
        style={{
          backgroundColor: isDark ? '#1A1A1D' : 'white',
          borderBottomWidth: !isDark ? 1 : 'none',
          borderBottomColor: !isDark ? '#D1D5DB' : 'none',
          ...styles.row,
        }}
        flexArr={flexArr}
      />
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

  const { screenWidth } = useScreenWidth()

  return (
    <Layout>
      <ScrollView>
        <View
          style={{
            paddingVertical: 16,
            flex: 1,
            paddingTop: 30,
            marginTop: 20,
            backgroundColor: isDark ? '#1A1A1D' : 'white',
            width: xxxs? screenWidth * 1 : xs ? screenWidth * 0.8 : screenWidth * 0.6,
          }}
        >
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              maxWidth: '100%',
            }}
          >
            <Table
              style={styles.tableStyle}
              borderStyle={{ borderColor: 'transparent' }}
            >
              <TitleRow title="Global Items List" />
              <Row
                flexArr={flexArr}
                data={['Item Name', 'Weight', 'Quantity', 'Category'].map(
                  (header, index) => (
                    <Cell
                      key={index}
                      data={
                        <RText
                          style={{
                            fontSize: 15,
                                 
                            fontWeight: 'bold',
                          }}
                        >
                          {header}
                        </RText>
                      }
                      textStyle={styles.headerText}
                    />
                  ),
                )}
                style={styles.head}
              />
              <ScrollView
                style={{ height:  'auto' }}
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  data.map((item, index) => {
                    return <TableItem key={index} itemData={item} />;
                  })
                )}
              </ScrollView>
            </Table>
          </ScrollView>
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
                backgroundColor: page < 2 ? 'gray' : '#0284c7',
                borderRadius: 5,
                borderColor: page < 2 ? 'gray' : '#0284c7',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
              disabled={page < 2}
              onPress={handlePreviousPage}
            >
              <AntDesign name="left" size={16} color="white" />
            </RButton>
            <RButton
              style={{
                marginLeft: 10,
                width: 50,
                backgroundColor: page === totalPages ? 'gray' : '#0284c7',
                borderRadius: 5,
                borderColor: page === totalPages ? 'gray' : '#0284c7',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
              disabled={page === totalPages}
              onPress={handleNextPage}
            >
              <AntDesign name="right" size={16} color="white" />
            </RButton>
          </View>
          <PaginationLimit limit={limit} setLimit={setLimit} />
        </View>
      </ScrollView>
    </Layout>
  );
};
