import { RLink } from '@packrat/ui';
import { RStack, RText, RButton, RSkeleton } from '@packrat/ui';
import { Platform, VirtualizedList } from 'react-native';
import { UserDataCard, UserDataList } from '../components';
import React, { memo, useEffect, useState } from 'react';
import LargeCard from 'app/components/card/LargeCard';
import useTheme from 'app/hooks/useTheme';
import { hexToRGBA } from 'app/utils/colorFunctions';
import { View } from 'react-native';
import { useAuthUser } from 'app/modules/auth';
import Layout from 'app/components/layout/Layout';
import { SearchProvider } from 'app/modules/feed';
import { type PreviewResourceStateWithData } from 'app/hooks/common';
import type { PreviewListType } from '../model';

// Skeleton version of the UserDataCard component
const SkeletonUserDataCard = () => {
  return (
    <View style={{ alignItems: 'center', padding: 5 }}>
      <RSkeleton
        style={{
          minHeight: 150,
          minWidth: 300,
        }}
      ></RSkeleton>
    </View>
  );
};

interface UserDataContainerProps {
  resource: PreviewResourceStateWithData;
  type: PreviewListType;
  userId?: string;
  isLoading?: boolean;
  SkeletonComponent?: React.ReactElement;
  searchTerm: string;
  onSearchChange: (search: string, type: PreviewListType) => void;
}

export const UserDataContainer = memo(function UserDataContainer({
  resource,
  type,
  userId,
  isLoading,
  SkeletonComponent,
  searchTerm,
  onSearchChange,
}: UserDataContainerProps) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const currentUser = useAuthUser();

  const typeUppercase = type.charAt(0).toUpperCase() + type.slice(1);

  const typeUppercaseSingular = typeUppercase.slice(0, -1);

  const differentUser = userId && currentUser && userId !== currentUser.id;
  const Card = ({ item, index }) => {
    return <UserDataCard item={item} cardType="primary" feedType={item.type} />;
  };

  // Map function to render multiple skeleton cards
  const skeletonCards =
    SkeletonComponent ||
    [...Array(3)].map((_, idx) => <SkeletonUserDataCard key={idx} />);

  if (isLoading) {
    return (
      <RStack
        style={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: 4,
        }}
      >
        {skeletonCards}
      </RStack>
    );
  }

  return (
    <Layout>
      <LargeCard
        type={Platform.OS !== 'web' ? 'mobile' : null}
        customStyle={{
          backgroundColor: hexToRGBA(currentTheme.colors.card, 0.2),
          padding: 0,
        }}
      >
        <RStack
          style={{
            alignItems: 'center',
            width: '100%',
          }}
        >
          <RText
            style={{
              textTransform: 'capitalize',
              fontSize: 24,
              fontWeight: 'bold',
              color: currentTheme.colors.tertiaryBlue,
            }}
          >
            {differentUser ? `${typeUppercase}` : `Your ${typeUppercase}`}
          </RText>
          <RStack
            style={{
              width: '100%',
              padding: 4,
            }}
          >
            {isLoading ? (
              skeletonCards
            ) : resource?.previewData && resource?.previewData.length > 0 ? (
              <>
                <VirtualizedList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  getItemCount={() => resource.previewData.length}
                  getItem={(data, index) => data[index]}
                  data={resource.previewData}
                  keyExtractor={(item) => item.id}
                  renderItem={Card}
                  scrollEnabled={true}
                  maxToRenderPerBatch={2}
                  horizontal={true}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                  }}
                  ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                />

                <SearchProvider>
                  <UserDataList
                    resource={resource}
                    search={searchTerm}
                    onSearchChange={(search) => onSearchChange(search, type)}
                  />
                </SearchProvider>
              </>
            ) : currentUser?.id === userId ? (
              <RLink href="/" style={{ textDecoration: 'none' }}>
                <RButton style={{ color: currentTheme.colors.white }}>
                  {`Create your first ${typeUppercaseSingular}`}
                </RButton>
              </RLink>
            ) : (
              <></>
            )}
          </RStack>
        </RStack>
      </LargeCard>
    </Layout>
  );
});
