import { Link } from "expo-router";
import { ScrollView, Stack } from "native-base";
import { Platform } from "react-native";

import PackCard from "./PackCard";
import PackCardMobile from "./PackCardMobile";

export default function PacksContainer({ data }) {
  return (
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
  );
}
