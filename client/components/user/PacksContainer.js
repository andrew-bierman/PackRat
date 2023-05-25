import { Link } from "expo-router";
import { ScrollView, Stack, VStack, Text } from "native-base";
import { Platform } from "react-native";

import PackCard from "./PackCard";
import PackCardMobile from "./PackCardMobile";

export default function PacksContainer({ data }) {
  return (
    <VStack
      space={2}
      alignItems="center"
      justifyContent="center"
      flex={1}
      width="100%"
    >
      <Text fontSize="2xl" fontWeight="bold" color="white">
        Your Packs
      </Text>
      <Stack
        direction={["column", "column", "column", "row"]}
        space={[5, 5, 5, 1.5]}
        flexWrap="wrap"
      >
        {data ? (
          data?.map((pack) =>
            Platform.OS === "web" ? (
              <PackCard key={pack._id} {...{ ...pack }} />
            ) : (
              <PackCardMobile key={pack._id} {...{ ...pack }} />
            )
          )
        ) : (
          <Link href="/">Create your first Pack</Link>
        )}
      </Stack>
    </VStack>
  );
}
