import React from 'react';
import { ScrollView, View } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';
import Loader from '../Loader';
import useTheme from '../../hooks/useTheme';
import Layout from 'app/components/layout/Layout';
import { BasicTable } from '@packrat/ui/src/Bento/elements/tables';
import { PaginationLimit } from '../paginationChooseLimit';

interface Category {
  id: string;
  name: string;
}

interface ItemType {
  global: string;
  name: string;
  weight: number;
  category?: Category;
  quantity: number;
  unit: string;
  id: string;
  type: string;
  ownerId: string;
  categoryId: string;
  updatedAt: any;
  createdAt: any;
}

interface GroupedData {
  [type: string]: ItemType[];
}

interface ItemsTableProps {
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  data: ItemType[];
  isLoading: boolean;
  totalPages: number;
  handleCheckboxChange?: (itemId: string) => void;
  onDelete?: (params: { itemId: string; packId: string }) => void;
  hasPermissions?: boolean;
  currentPack?: any;
  refetch?: () => void;
  setRefetch?: () => void;
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

  const groupByType = (items: ItemType[]): Record<string, ItemType[]> => {
    return items.reduce((acc, item) => {
      const { type } = item;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    }, {} as GroupedData);
  };

  const filteredData = data.map((item) => {
    const {
      id,
      categoryId,
      createdAt,
      updatedAt,
      ownerId,
      global,
      ...filteredItem
    } = item;
    return filteredItem;
  });

  const groupedData = groupByType(filteredData);

  return (
    <Layout>
      <ScrollView>
        <View
          style={{
            paddingVertical: 16,
            flex: 1,
            padding: 30,
            backgroundColor: isDark ? '#1A1A1D' : 'white',
            width: '100%',
            borderRadius: 12,
            
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <BasicTable
              groupedData={groupedData}
              onDelete={onDelete}
              handleCheckboxChange={handleCheckboxChange}
              currentPack={currentPack}
              hasPermissions={hasPermissions}
              refetch={refetch ?? false}
              setRefetch={setRefetch}
            ></BasicTable>
            // <></>
          )}
          <PaginationLimit limit={limit} setLimit={setLimit} />
        </View>
      </ScrollView>
    </Layout>
  );
};
