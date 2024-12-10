import React from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  type ViewProps,
} from 'react-native';
import { RText } from '@packrat/ui';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';

interface FeedListProps {
  data: any;
  CardComponent: React.ComponentType<{ item: any }>;
  refreshing?: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
  errorMessage?: string;
  separatorHeight?: number;
  footerComponent?: JSX.Element;
  keyExtractor?: (any, number) => string;
  style?: ViewProps['style'];
}

export const FeedList = ({
  data,
  CardComponent,
  refreshing = false,
  onRefresh,
  isLoading = false,
  errorMessage = 'No Data Available',
  footerComponent,
  style,
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
    <View style={style}>
      {isLoading ? (
        <ActivityIndicator size="large" color={currentTheme.colors.text} />
      ) : (
        <FlatList
          key={`flatlist-numColumns-${numColumns}`}
          numColumns={numColumns}
          data={data}
          keyExtractor={keyExtractor || ((item, index) => index.toString())}
          contentContainerStyle={{ gap: 10 }}
          columnWrapperStyle={numColumns > 1 ? { gap: 10 } : undefined}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <CardComponent item={item} />
            </View>
          )}
          ListFooterComponent={
            footerComponent || <View style={{ height: 50 }} />
          }
          ListEmptyComponent={() => <RText>{errorMessage}</RText>}
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            ) : undefined
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
