import { Container, Box, Text, HStack, Stack } from "native-base";
import { StyleSheet } from "react-native";

import Card from "./Card";
// import useGetPublicPacks from "../../hooks/useGetPublicPacks";
import { theme } from "../../theme";
import DropdownComponent from "../Dropdown";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPublicPacks } from "../../store/feedStore";
import { fetchUserPacks } from "../../store/packsStore";

import { Link } from "expo-router";

const dataValues = ["Favorite", "Most Recent"];

export default function Feed({ feedType = "public" }) {
  const [queryString, setQueryString] = useState("");

  const dispatch = useDispatch()

  const ownerId = useSelector((state) => state.auth.user?._id);

  const publicPacksData = useSelector((state) => state.feed.publicPacks);
  const userPacksData = useSelector((state) => state.packs.packs);


  useEffect(() => {
    if (feedType === "public") {
      dispatch(getPublicPacks(queryString))
    } else if (feedType === "userPacks" && ownerId) {
      dispatch(fetchUserPacks(ownerId))
    } else if (feedType === "userTrips") {
      
    } else if (feedType === "favoritePacks") {
      dispatch(getFavoritePacks())
    }

  }, [queryString, feedType, ownerId]);

const renderData = () => {
  const data = feedType === "public" ? publicPacksData : userPacksData;

  let urlPath = "/pack/";
  let errorText = "No Public Packs Available";

  switch (feedType) {
    case "userPacks":
      urlPath = "/pack/";
      errorText = "No User Packs Available";
      break;
    case "favoritePacks":
      urlPath = "/pack/";
      errorText = "No Favorite Packs Available";
      break;
    default:
      break;
  }

  if (data?.length > 0) {
    return data.map((item) => (
      <Link key={"link-key" + item?._id} href={urlPath + item?._id}>
        <Card key={item?._id} {...{ ...item }} />
      </Link>
    ));
  } else {
    return <Text>{errorText}</Text>;
  }
};


  return (
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

        {
          renderData()
        }

      </Stack>
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
