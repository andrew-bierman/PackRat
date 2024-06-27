import { RLink } from '@packrat/ui';
import { RStack, RText, RButton, RSkeleton } from '@packrat/ui';
import { VirtualizedList } from 'react-native';
import UserDataCard from './UserDataCard';
import React, { useEffect, useState } from 'react';
import LargeCard from '../card/LargeCard';
import useTheme from '../../hooks/useTheme';
import { hexToRGBA } from 'app/utils/colorFunctions';
import { View } from 'react-native';
import { useAuthUser } from 'app/auth/hooks';
import DataList from './UserDetailList';
import Layout from 'app/components/layout/Layout';
import { SearchProvider } from 'app/components/feed/SearchProvider';

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
  data: any;
  type: 'packs' | 'trips' | 'favorites';
  userId?: string;
  isLoading?: boolean;
  SkeletonComponent?: React.ReactElement;
}

export default function UserDataContainer({
  data = [],
  type,
  userId,
  isLoading,
  SkeletonComponent,
}: UserDataContainerProps) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [dataState, setDataState] = useState(
    data.length > 0 ? Array(data.length).fill(false) : [],
  );
  useEffect(() => {
    setDataState(Array(data.length).fill(false));
  }, [data]);
  const currentUser = useAuthUser();

  const typeUppercase = type.charAt(0).toUpperCase() + type.slice(1);

  const typeUppercaseSingular = typeUppercase.slice(0, -1);

  const cardType = type === 'packs' || type === 'favorites' ? 'pack' : 'trip';

  const differentUser = userId && currentUser && userId !== currentUser.id;
  const Card = ({ item, index }) => {
    return (
      <UserDataCard
        key={item.id}
        {...item}
        state={dataState}
        setState={setDataState}
        index={index}
        differentUser={differentUser}
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
    <Layout>
      <LargeCard
        customStyle={{
          backgroundColor: hexToRGBA(currentTheme.colors.card, 0.2),
          padding:10
        }}
      >
        <RStack
          style={{
            gap: 10,
            alignItems: 'center',
            width: '100%',
          }}
        >
          <RText
            style={{
              textTransform: 'capitalize',
              fontSize: 24,
              fontWeight: 'bold',
              color: currentTheme.colors.textColor,
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
            ) : data && data.length > 0 ? (
              <>
                <VirtualizedList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  getItemCount={() => data.length}
                  getItem={(data, index) => data[index]}
                  data={data}
                  keyExtractor={(item) => item.id}
                  renderItem={Card}
                  scrollEnabled={true}
                  maxToRenderPerBatch={2}
                  horizontal={true}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{
                    padding:10
                    // paddingHorizontal: 1,
                    // paddingVertical: 3,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}
                />

                <SearchProvider><DataList data={data} /></SearchProvider>
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
}
