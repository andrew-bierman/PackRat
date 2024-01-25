import { Link } from 'solito/link';
import { Stack, VStack, Text, Button } from 'native-base';
import { RStack, RText, RButton, RSkeleton } from '@packrat/ui';
import { Platform } from 'react-native';
import UserDataCard from './UserDataCard';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LargeCard from '../card/LargeCard';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { hexToRGBA } from 'app/utils/colorFunctions';
import { View, FlatList } from 'react-native';

// Skeleton version of the UserDataCard component
const SkeletonUserDataCard = () => {
  return (
    <View style={{ alignItems: 'center', padding: '5' }}>
      <RSkeleton
        style={{
          minHeight: 150,
          minWidth: 300,
        }}
      ></RSkeleton>
    </View>
  );
};

export default function UserDataContainer({
  data = [],
  type,
  userId,
  isLoading,
  SkeletonComponent,
}) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [dataState, setDataState] = useState(
    data.length > 0 ? Array(data.length).fill(false) : [],
  );
  useEffect(() => {
    setDataState(Array(data.length).fill(false));
  }, [data]);
  const currentUser = useSelector((state) => state.auth.user);

  const typeUppercase = type.charAt(0).toUpperCase() + type.slice(1);

  const typeUppercaseSingular = typeUppercase.slice(0, -1);

  const cardType = type === 'packs' ? 'pack' : 'trip';

  const differentUser = userId && userId !== currentUser.id;

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
        // backgroundColor: theme.colors.white,
        // light transparent grey
        backgroundColor: hexToRGBA(currentTheme.colors.card, 0.2),
      }}
    >
      <RStack
        style={{
          gap: 16,
          alignItems: 'center',
          flex: 1,
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
          {differentUser
            ? // ? `${userId}'s ${typeUppercase}`
              `${typeUppercase}`
            : `Your ${typeUppercase}`}
        </RText>
        <RStack
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: 4,
          }}
        >
          {isLoading ? (
            skeletonCards
          ) : data && data.length > 0 ? (
            //   data?.map((dataItem, index) => (
            //     <UserDataCard
            //       key={dataItem.id}
            //       {...{ ...dataItem }}
            //       type={cardType}
            //       state={dataState}
            //       setState={setDataState}
            //       index={index}
            //       differentUser={differentUser}
            //     />
            //   ))
            // )
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <UserDataCard
                  key={item.id}
                  {...item}
                  type={cardType}
                  state={dataState}
                  setState={setDataState}
                  index={index}
                  differentUser={differentUser}
                />
              )}
              keyExtractor={(item) => item.id}
              maxToRenderPerBatch={2}
              // Other FlatList props like onEndReached for infinite scrolling
            />
          ) : currentUser?.id === userId ? (
            <Link href="/">
              <RButton
                style={{ color: currentTheme.colors.white, width: '100%' }}
              >
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
