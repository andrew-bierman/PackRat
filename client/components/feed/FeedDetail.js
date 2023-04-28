import { Container, Box, Text, HStack, Stack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Card";
import { theme } from "../../theme";
import { useSearchParams } from "expo-router";
import useGetItems from "../../hooks/useGetItems";

export default function FeedDetail() {
  const { pack } = useSearchParams();
  const { data, isLoading, isError, error } = useGetItems(pack);
  console.log(data)
  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box style={styles.mainContainer}>
      {data?.length > 0 ? (
        <Card {...{ ...data[0] }} total_weight={data[0].weight} />)
        : (
          <Text>No Pack Available to that Id</Text>
        )}
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    minHeight: "100vh",
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
