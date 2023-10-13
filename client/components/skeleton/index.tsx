import { Center, Skeleton, VStack } from 'native-base';

export const TableLoader = () => {
  return (
    <Center w="100%">
      <VStack
        w="100%"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton h="16" />
        <Skeleton.Text px="4" />
      </VStack>
    </Center>
  );
};
