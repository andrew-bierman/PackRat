import React from 'react';
import { ScrollView, View } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';
import Loader from '../Loader';
import useTheme from '../../hooks/useTheme';
import Layout from 'app/components/layout/Layout';
import { PaginatedSortedTable } from '@packrat/ui/src/Bento/elements/tables';
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
    <View
      style={{
        padding: 10,
        backgroundColor: isDark ? '#1A1A1D' : 'white',
        borderRadius: 12,
        margin: 20,
      }}
    >
      <Layout>
        <ScrollView>
          <View
            style={{
              flexGrow: 1,
              backgroundColor: isDark ? '#1A1A1D' : 'white',
              width: '100%',
            }}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <PaginatedSortedTable
                groupedData={groupedData}
                handleCheckboxChange={handleCheckboxChange}
                onDelete={onDelete}
                hasPermissions={hasPermissions}
                currentPack={currentPack}
                refetch={refetch}
                setRefetch={setRefetch}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
            )}
            <PaginationLimit limit={limit} setLimit={setLimit} />
          </View>
        </ScrollView>
      </Layout>
    </View>
  );
};
