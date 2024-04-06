import { Link } from '@packrat/crosspath';
import {
  RStack,
  RText,
  RButton,
  RSkeleton,
  VirtualList,
  BaseModal,
} from '@packrat/ui';
import { VirtualizedList } from 'react-native';
import UserDataCard from './UserDataCard';
import React, { useEffect, useState } from 'react';
import LargeCard from '../card/LargeCard';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { hexToRGBA } from 'app/utils/colorFunctions';
import { View, FlatList } from 'react-native';
import { useAuthUser } from 'app/auth/hooks';
import DataList from './UserDetailList';

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
  type: 'packs' | 'trips';
  userId?: string;
  isLoading: boolean;
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

  const cardType = type === 'packs' ? 'pack' : 'trip';

  const differentUser = userId && userId !== currentUser._id;

  const Card = ({ item, index }) => {
    return (
      <UserDataCard
        key={item._id}
        {...item}
        type={cardType}
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
    <LargeCard
      customStyle={{
        backgroundColor: hexToRGBA(currentTheme.colors.card, 0.2),
      }}
    >
      <RStack
        style={{
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: 24,
        }}
      >
        <RText
          color={currentTheme.colors.textColor}
          style={{
            textTransform: 'capitalize',
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {differentUser ? `${typeUppercase}` : `Your ${typeUppercase}`}
        </RText>
        <RStack
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
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
                keyExtractor={(item) => item._id}
                renderItem={Card}
                scrollEnabled={true}
                maxToRenderPerBatch={2}
                horizontal={true}
                nestedScrollEnabled={true}
                contentContainerStyle={{
                  paddingHorizontal: 3,
                  paddingVertical: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />

              <DataList data={data} />
            </>
          ) : // <VirtualizedList
          //   getItemCount={() => data.length}
          //   getItem={(data, index) => data[index]}
          //   nestedScrollEnabled={true}
          //   data={data}
          //   horizontal={true}
          //   scrollEnabled={true}
          //   renderItem={({ item, index }) => (
          //     <UserDataCard
          //       key={item._id}
          //       {...item}
          //       type={cardType}
          //       state={dataState}
          //       setState={setDataState}
          //       index={index}
          //       differentUser={differentUser}
          //     />
          //   )}
          //   keyExtractor={(item) => item._id}
          //   maxToRenderPerBatch={2}
          //   contentContainerStyle={{
          //     width : '100%',
          //     height : '100%',
          //     padding : 16
          //     // flex: 1,
          //     // justifyContent: 'center',
          //     // alignItems: 'center',
          //     // flexDirection : 'row'
          //   }}
          // />
          currentUser?._id === userId ? (
            <Link href="/">
              <RButton style={{ color: currentTheme.colors.white }}>
                {`Create your first ${typeUppercaseSingular}`}
              </RButton>
            </Link>
          ) : (
            <></>
          )}
        </RStack>
      </RStack>
    </LargeCard>
  );
}
