import { Container, Box, Text, HStack, Stack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { useAuth } from "../../auth/provider";
import CardMobile from "./CardMobile";
import useGetPublicPacks from "../../hooks/useGetPublicPacks";
import { theme } from "../../theme";
import DropdownComponent from "../Dropdown";
import { useState } from "react";

const dataValues = ["Favorite", "Most Recent"];

export default function FeedMobile() {
  const [queryString, setQueryString] = useState("");

  const { data, isLoading, isError, error } = useGetPublicPacks(queryString);

  return (
    <ScrollView>
      <Box style={styles.mainContainer}>
        <DropdownComponent
          value={queryString}
          data={dataValues}
          setUnit={setQueryString}
          style={styles.dropdown}
        />

        <Stack
          direction={["column", "column", "column", "row"]}
          space={[3, 3, 3, 0]}
          flexWrap="wrap"
        >
          {data?.length > 0 ? (
            data?.map((pack) => <CardMobile key={pack?._id} {...{ ...pack }} />)
          ) : (
            <Text>No Public Packs Available</Text>
          )}
        </Stack>
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
