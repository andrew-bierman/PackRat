import { Container, Box, Text, HStack, Stack, ScrollView, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { useAuth } from "../../auth/provider";
import FeedCardMobile from "./FeedCardMobile";
// import useGetPublicPacks from "../../hooks/useGetPublicPacks";
import { theme } from "../../theme";
import DropdownComponent from "../Dropdown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPublicPacks } from "../../store/feedStore";

const dataValues = ["Favorite", "Most Recent"];

export default function FeedMobile() {
  const [queryString, setQueryString] = useState("");

  // const { data, isLoading, isError, error } = useGetPublicPacks(queryString);

  const dispatch = useDispatch();
  const publicParksData = useSelector((state) => state.feed.publicPacks);

  useEffect(() => {
    dispatch(getPublicPacks(queryString));
  }, [queryString]);

  return (
    <VStack>
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
          {publicParksData?.length > 0 ? (
            publicParksData?.map((pack) => (
              <FeedCardMobile key={pack?._id} {...{ ...pack }} />
            ))
          ) : (
            <Text>No Public Packs Available</Text>
          )}
        </Stack>
      </Box>
    </VStack>
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
