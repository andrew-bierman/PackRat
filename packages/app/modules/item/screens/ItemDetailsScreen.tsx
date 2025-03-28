import React from 'react';
import { RStack, RH3, RText } from '@packrat/ui';
import { useItem, useItemId } from 'app/modules/item';
import { ItemDetailsSection } from '../components/ItemDetailsSection';
import useTheme from 'app/hooks/useTheme';
import { FeedPreview } from 'app/modules/feed';
import LargeCard from 'app/components/card/LargeCard';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'app/hooks/router';
import RLink from '@packrat/ui/src/RLink';
import Layout from 'app/components/layout/Layout';
import useResponsive from 'app/hooks/useResponsive';

export function ItemDetailsScreen() {
  const { currentTheme } = useTheme();
  const [itemId] = useItemId();
  const { data: item, isLoading } = useItem(itemId);
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  const { sm } = useResponsive();

  if (isLoading) {
    return null;
  }

  return (
    <Layout>
      <RStack style={styles.breadcrumbContainer}>
        {Platform.OS === 'web' ? (
          <RLink to="/products">
            <RText style={styles.breadcrumbLink}>Products</RText>
          </RLink>
        ) : (
          <TouchableOpacity onPress={() => router.push('/products')}>
            <RText style={styles.breadcrumbLink}>Products</RText>
          </TouchableOpacity>
        )}

        <RText style={styles.breadcrumbSeparator}>/</RText>

        {Platform.OS === 'web' ? (
          <RLink to={`/products`}>
            <RText style={styles.breadcrumbLink}>{item?.category?.name}</RText>
          </RLink>
        ) : (
          <TouchableOpacity onPress={() => router.push('/products')}>
            <RText style={styles.breadcrumbLink}>{item?.categoryId}</RText>
          </TouchableOpacity>
        )}
      </RStack>
      <RStack
        style={{
          padding: 10,
          width: '100%',
          paddingBottom: 50,
          flexDirection: sm ? 'column' : 'row',
          gap: 20,
        }}
      >
        <ItemDetailsSection itemData={item as any} isProductScreen={true} />
      </RStack>
      <LargeCard
        customStyle={{
          width: '100%',
          backgroundColor: currentTheme.colors.background,
          paddingBottom: 24,
          gap: 16,
          paddingTop: 0,
          borderWidth: 1,
          borderColor: currentTheme.colors.cardBorderPrimary,
        }}
      >
        <RH3
          style={{
            color: currentTheme.colors.text,
            fontSize: 24,
            alignSelf: 'flex-start',
            marginBottom: 20,
          }}
        >
          Similar Items
        </RH3>
        <FeedPreview feedType="similarItems" id={itemId} />
      </LargeCard>
    </Layout>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    breadcrumbContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.colors.border,
      padding: 8,
      paddingLeft: 16,
      borderRadius: 20,
      marginBottom: 10,
      gap: 4,
    },
    breadcrumbLink: {
      color: currentTheme.colors.text,
      fontSize: 14,
      fontWeight: 'bold',
    },
    breadcrumbSeparator: {
      marginHorizontal: 5,
      color: currentTheme.colors.text,
    },
  };
};
