import React from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { RText } from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';

interface FeedListProps {
  data: any;
  CardComponent: React.ComponentType<{ item: any }>;
  refreshing: boolean;
  onRefresh: () => void;
  isLoading?: boolean;
  errorMessage?: string;
  separatorHeight?: number;
  footerComponent?: JSX.Element;
  keyExtractor?: (any, number) => string;
}

export const FeedList = ({
  data,
  CardComponent,
  refreshing,
  onRefresh,
  isLoading = false,
  errorMessage = 'No Data Available',
  footerComponent,
  keyExtractor,
}: FeedListProps) => {
  const { xs, xxs, sm, md, lg } = useResponsive();
  const { currentTheme } = useTheme();

  const getNumColumns = () => {
    if (xxs || xs) return 1;
    if (sm) return 1;
    if (md) return 2;
    if (lg) return 3;
    return 4;
  };

  const numColumns = getNumColumns();

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color={currentTheme.colors.text} />
      ) : (
        <FlatList
          key={`flatlist-numColumns-${numColumns}`}
          numColumns={numColumns}
          data={data}
          keyExtractor={keyExtractor || ((item, index) => index.toString())}
          renderItem={({ item }) => (
            <View style={{ flex: 1, padding: 10 }}>
              <CardComponent item={item} />
            </View>
          )}
          ListFooterComponent={
            footerComponent || <View style={{ height: 50 }} />
          }
          ListEmptyComponent={() => <RText>{errorMessage}</RText>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
