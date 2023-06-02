import { Container, Box, Text, HStack, Stack, Switch } from "native-base";
import { StyleSheet } from "react-native";

import Card from "./FeedCard";
// import useGetPublicPacks from "../../hooks/useGetPublicPacks";
import { theme } from "../../theme";
import DropdownComponent from "../Dropdown";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPublicPacks, getPublicTrips } from "../../store/feedStore";
import { fetchUserPacks } from "../../store/packsStore";

import { Link } from "expo-router";
import { fetchUserTrips } from "../../store/tripsStore";

const dataValues = ["Favorite", "Most Recent"];

export default function Feed({ feedType = "public" }) {
  const [queryString, setQueryString] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });

  const dispatch = useDispatch();

  const ownerId = useSelector((state) => state.auth.user?._id);

  const publicPacksData = useSelector((state) => state.feed.publicPacks);
  const userPacksData = useSelector((state) => state.packs.packs);

  const publicTripsData = useSelector((state) => state.feed.publicTrips);

  useEffect(() => {
    if (feedType === "public") {
      dispatch(getPublicPacks(queryString));
      dispatch(getPublicTrips(queryString));
    } else if (feedType === "userPacks" && ownerId) {
      dispatch(fetchUserPacks(ownerId));
    } else if (feedType === "userTrips" && ownerId) {
      dispatch(fetchUserTrips(ownerId));
    } else if (feedType === "favoritePacks") {
      dispatch(getFavoritePacks());
    }
  }, [queryString, feedType, ownerId]);

  const renderData = () => {
    // const data =
    //   feedType === "public"
    //     ? [...publicPacksData, ...publicTripsData]
    //     : userPacksData;

    let data = [];
    if (feedType === "public") {
      if (selectedTypes.pack) {
        data = [
          ...data,
          ...publicPacksData,
        ];
      }
      if (selectedTypes.trip) {
        data = [
          ...data,
          ...publicTripsData,
        ];
      }
    } else if (feedType === "userPacks") {
      data = userPacksData;
    } else if (feedType === "userTrips") {
      data = userTripsData;
    } else if (feedType === "favoritePacks") {
      data = userPacksData.filter((pack) => pack.isFavorite);
    }

    let urlPath = "/pack/";
    let errorText = "No Public Feed Data Available";

    switch (feedType) {
      case "userPacks":
        urlPath = "/pack/";
        errorText = "No User Packs Available";
        break;
      case "favoritePacks":
        urlPath = "/pack/";
        errorText = "No Favorite Packs Available";
        break;
      case "userTrips":
        urlPath = "/trip/";
        errorText = "No User Trips Available";
        break;
      default:
        break;
    }

    if (data?.length > 0) {
      return data.map((item) => (
        <Link key={"link-key" + item?._id} href={item?.type === 'pack' ? '/pack/' + item?._id : '/trip/' + item?._id}>
          <Card key={item?._id} type={item.type} {...{ ...item }} />
        </Link>
      ));
    } else {
      return <Text>{errorText}</Text>;
    }
  };

  return (
    <Box style={styles.mainContainer}>
      <HStack space={3} alignItems="center"
        style={styles.bar}
      >
        <Text fontSize="lg" fontWeight="bold">
          Packs
        </Text>

        <Switch
          size="lg"
          isChecked={selectedTypes.pack}
          onToggle={() =>
            setSelectedTypes({ ...selectedTypes, pack: !selectedTypes.pack })
          }
        />

        <Text fontSize="lg" fontWeight="bold">
          Trips
        </Text>

        <Switch
          size="lg"
          isChecked={selectedTypes.trip}
          onToggle={() =>
            setSelectedTypes({ ...selectedTypes, trip: !selectedTypes.trip })
          }
        />

        <Text fontSize="lg" fontWeight="bold">
          Sort By:
        </Text>

        <DropdownComponent
          value={queryString}
          data={dataValues}
          setUnit={setQueryString}
          style={styles.dropdown}
        />
      </HStack>

      <Stack
        direction={["column", "column", "column", "row"]}
        space={[3, 3, 3, 0]}
        flexWrap="wrap"
      >
        {renderData()}
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
  bar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
