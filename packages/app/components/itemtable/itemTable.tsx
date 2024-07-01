import React from 'react';
import { ScrollView, View, Platform } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';
import Loader from '../Loader';
import useTheme from '../../hooks/useTheme';
import { useDeleteItem } from 'app/hooks/items';
import Layout from 'app/components/layout/Layout';
import { PaginationLimit } from '../paginationChooseLimit';
import { RButton, RStack, RText } from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import { useScreenWidth } from 'app/hooks/common/useScreenWidth';
import { AntDesign } from '@expo/vector-icons';
import { BasicTable } from '@packrat/ui/src/Bento/elements/tables';

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
  categoryId:string;
  updatedAt:any;
  createdAt:any;
}

interface ItemsTableProps {
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  data: ItemType[];
  isLoading: boolean;
  totalPages: number;
  handleCheckboxChange: (itemId: string) => void;
  onDelete: (params: { itemId: string; packId: string }) => void;
  hasPermissions: boolean;
  currentPack: any;
  refetch: () => void;
  setRefetch: () => void;
}

export const ItemsTable = ({
  limit,
  setLimit,
  page,
  setPage,
  data,
  isLoading,
  totalPages,
  handleCheckboxChange,
  onDelete,
  hasPermissions,
  currentPack,
  refetch,
  setRefetch,
}: ItemsTableProps) => {
  const { xs, xxxs } = useResponsive();
  const { isDark } = useTheme();
  const { handleDeleteItem } = useDeleteItem();

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const { screenWidth } = useScreenWidth()
const filteredData = data.map(item => {
  const { id, categoryId, createdAt, updatedAt, ownerId,global, ...filteredItem } = item;
  return filteredItem;
});
  return (
    <Layout>
      <ScrollView>
        <View
          style={{
            paddingVertical: 16,
            flex: 1,
            paddingTop: 30,
            marginTop: 20,
            marginBottom:20,
            backgroundColor: isDark ? '#1A1A1D' : 'white',
            width: xxxs? screenWidth * 1 : xs ? screenWidth * 0.8 : screenWidth * 0.6,
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <BasicTable
              groupedData={filteredData}
              handleCheckboxChange={handleCheckboxChange}
              onDelete={onDelete}
              hasPermissions={false}
              currentPack={currentPack}
              refetch={refetch}
              setRefetch={setRefetch}
            />
          )}

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
