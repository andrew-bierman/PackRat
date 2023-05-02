import { Box, Text, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import CardMobile from "./CardMobile";
import { theme } from "../../theme";
import { useSearchParams } from "expo-router";
import useGetPacks from "../../hooks/useGetPacks";

export default function FeedDetailMobile() {
  const { pack } = useSearchParams();
  const { data, isLoading, isError, error } = useGetPacks(pack);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <Box style={styles.mainContainer}>
        {data?.length > 0 ? (
          <CardMobile {...{ ...data[0] }} />)
          : (
            <Text>No Pack Available to that Id</Text>
          )}
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    gap: 15,
    padding: 15,
    fontSize: 18,
    width: "100%",
  },
  packsContainer: {
    flexDirection: "column",
    minHeight: "100vh",

    padding: 25,
    fontSize: 26,
  },
  dropdown: {
    backgroundColor: "white",
  },
});
