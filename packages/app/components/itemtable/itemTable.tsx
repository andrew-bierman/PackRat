import React from 'react';
import { ScrollView, View } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';
import Loader from '../Loader';
import useTheme from '../../hooks/useTheme';
import Layout from 'app/components/layout/Layout';
import { PaginatedSortedTable } from '@packrat/ui/src/Bento/elements/tables';
import { PaginationLimit } from '../paginationChooseLimit';
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
  categoryId: string;
  updatedAt: any;
  createdAt: any;
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
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <PaginatedSortedTable
              groupedData={filteredData}
              handleCheckboxChange={handleCheckboxChange}
              onDelete={onDelete}
              hasPermissions={false}
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
  );
};
