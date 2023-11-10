import { Link } from 'expo-router';
import { Stack, VStack, Text, Button } from 'native-base';
import { Platform } from 'react-native';
import UserDataCard from './UserDataCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LargeCard from '../card/LargeCard';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { hexToRGBA } from '~/utils/colorFunctions';
import { Box, Skeleton } from 'native-base';

// Skeleton version of the UserDataCard component
const SkeletonUserDataCard = () => {
  return (
    <Box alignItems="center" padding="5">
      <Skeleton
        minH="125"
        minW="80"
        width={'100px'}
        rounded="lg"
        opacity={0.5}
      ></Skeleton>
    </Box>
  );
};

export default function UserDataContainer({
  data = [],
  type,
  userId,
  isLoading,
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

  const differentUser = userId && userId !== currentUser._id;

  // Map function to render multiple skeleton cards
  const skeletonCards = [...Array(3)].map((_, idx) => (
    <SkeletonUserDataCard key={idx} />
  ));

  if (isLoading) {
    return (
      <Stack
        direction={['column', 'column', 'column', 'row']}
        space={[4, 4, 4, 2]}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        width="100%"
        padding={4}
      >
        {skeletonCards}
      </Stack>
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
      <VStack space={5} alignItems="center" flex={1} width="100%" padding={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={currentTheme.colors.textColor}
          uppercase={true}
        >
          {differentUser
            ? // ? `${userId}'s ${typeUppercase}`
              `${typeUppercase}`
            : `Your ${typeUppercase}`}
        </Text>
        <Stack
          direction={['column', 'column', 'column', 'row']}
          space={[4, 4, 4, 2]}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          width="100%"
          padding={4}
        >
          {isLoading ? (
            skeletonCards
          ) : data && data.length > 0 ? (
            data?.map((dataItem, index) => (
              <UserDataCard
                key={dataItem._id}
                {...{ ...dataItem }}
                type={cardType}
                state={dataState}
                setState={setDataState}
                index={index}
                differentUser={differentUser}
              />
            ))
          ) : currentUser?._id === userId ? (
            <Link href="/">
              <Button
                _text={{
                  color: currentTheme.colors.white,
                }}
                w={['100%', '100%', '100%', 'auto']}
              >
                {`Create your first ${typeUppercaseSingular}`}
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </Stack>
      </VStack>
    </LargeCard>
  );
}
