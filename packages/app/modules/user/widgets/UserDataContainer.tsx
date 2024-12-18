import { RLink } from '@packrat/ui';
import { RStack, RText, RButton, RSkeleton } from '@packrat/ui';
import { Platform, VirtualizedList } from 'react-native';
import { UserDataCard, UserDataList } from '../components';
import React, { memo } from 'react';
import useTheme from 'app/hooks/useTheme';
import { View } from 'react-native';
import { useAuthUser } from 'app/modules/auth';
import { SearchProvider } from 'app/modules/feed';
import { type PreviewResourceStateWithData } from 'app/hooks/common';
import type { PreviewListType } from '../model';
import Carousel from 'app/components/carousel';

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
  isAuthUserProfile?: boolean;
  searchTerm: string;
  onSearchChange: (search: string, type: PreviewListType) => void;
}

export const UserDataContainer = memo(function UserDataContainer({
  resource,
  type,
  userId,
  isLoading,
  SkeletonComponent,
  isAuthUserProfile,
  searchTerm,
  onSearchChange,
}: UserDataContainerProps) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const currentUser = useAuthUser();

  const typeUppercase = type.charAt(0).toUpperCase() + type.slice(1);

  const typeUppercaseSingular = typeUppercase.slice(0, -1);

  const differentUser = userId && currentUser && userId !== currentUser.id;
  const Card = ({ item }) => {
    return (
      <UserDataCard
        isAuthUserProfile={isAuthUserProfile}
        item={item}
        cardType="primary"
        feedType={item.type}
      />
    );
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
    <>
      <RStack
        style={{
          alignItems: 'center',
          width: '100%',
        }}
      >
        <RStack
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 10,
          }}
        >
          <RText
            style={{
              textTransform: 'capitalize',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            {differentUser ? `${typeUppercase}` : `Your ${typeUppercase}`}
          </RText>
          <SearchProvider>
            <UserDataList
              resource={resource}
              search={searchTerm}
              onSearchChange={(search) => onSearchChange(search, type)}
            />
          </SearchProvider>
        </RStack>
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
              <Carousel itemWidth={200}>
                {resource?.previewData?.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <Card item={item} />
                  </View>
                ))}
              </Carousel>
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
    </>
  );
});
