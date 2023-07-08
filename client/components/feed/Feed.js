import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "expo-router";
import { Container, Box, Text, HStack, Stack, Switch, Button } from "native-base";
import { StyleSheet, FlatList } from "react-native";
import Card from "./FeedCard";
import DropdownComponent from "../Dropdown";
import { theme } from "../../theme";
import {
  getPublicPacks,
  getPublicTrips,
  getFavoritePacks,
} from "../../store/feedStore";
import { fetchUserPacks, selectAllPacks } from "../../store/packsStore";
import { fetchUserTrips } from "../../store/tripsStore";
import { useRouter } from "expo-router";

const URL_PATHS = {
  userPacks: "/pack/",
  favoritePacks: "/pack/",
  userTrips: "/trip/",
};

const ERROR_MESSAGES = {
  public: "No Public Feed Data Available",
  userPacks: "No User Packs Available",
  favoritePacks: "No Favorite Packs Available",
  userTrips: "No User Trips Available",
};

const dataValues = ["Favorite", "Most Recent"];

const Feed = ({ feedType = "public" }) => {
  const router = useRouter();

  const [queryString, setQueryString] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });

  const dispatch = useDispatch();
  const ownerId = useSelector((state) => state.auth.user?._id);
  const publicPacksData = useSelector((state) => state.feed.publicPacks);
  const userPacksData = useSelector(selectAllPacks);
  const publicTripsData = useSelector((state) => state.feed.publicTrips);
  const userTripsData = useSelector((state) => state.trips.userTrips);

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
    let data = [];
    if (feedType === "public") {
      if (selectedTypes.pack) {
        data = [...data, ...publicPacksData];
      }
      if (selectedTypes.trip) {
        data = [...data, ...publicTripsData];
      }
    } else if (feedType === "userPacks") {
      data = userPacksData;
    } else if (feedType === "userTrips") {
      data = userTripsData;
    } else if (feedType === "favoritePacks") {
      data = userPacksData.filter((pack) => pack.isFavorite);
    }

    if (data.length > 0) {
      return (
        <FlatList
          data={data}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <Link
              key={"link-key" + item?._id}
              href={item.type === "pack" ? "/pack/" + item?._id : "/trip/" + item?._id}
            >
              <Card key={item?._id} type={item.type} {...item} />
            </Link>
          )}
        />
      );
    } else {
      return <Text>{ERROR_MESSAGES[feedType]}</Text>;
    }
  };

  const handleTogglePack = () => {
    setSelectedTypes((prevState) => ({
      ...prevState,
      pack: !prevState.pack,
    }));
  };

  const handleToggleTrip = () => {
    setSelectedTypes((prevState) => ({
      ...prevState,
      trip: !prevState.trip,
    }));
  };

  const handleSortChange = (value) => {
    setQueryString(value);
  };

  const handleCreateClick = () => {
    // handle create click logic
    router.push(createUrlPath)
  };

  const urlPath = URL_PATHS[feedType];
  const createUrlPath = URL_PATHS[feedType] + "create";
  const errorText = ERROR_MESSAGES[feedType];

  return (
    <Box
      style={[
        styles.mainContainer,
        Platform.OS === "web" ? { minHeight: "100vh" } : null,
      ]}
    >
      <HStack space={3} alignItems="center" style={styles.bar}>
        {feedType === "public" && (
          <>
            <Text fontSize="lg" fontWeight="bold">
              Packs
            </Text>
            <Switch
              size="lg"
              isChecked={selectedTypes.pack}
              onToggle={handleTogglePack}
            />
            <Text fontSize="lg" fontWeight="bold">
              Trips
            </Text>
            <Switch
              size="lg"
              isChecked={selectedTypes.trip}
              onToggle={handleToggleTrip}
            />
          </>
        )}

        <Text fontSize="lg" fontWeight="bold">
          Sort By:
        </Text>

        <DropdownComponent
          value={queryString}
          data={dataValues}
          onValueChange={handleSortChange}
          placeholder="Sort By"
          style={styles.dropdown}
          width="auto"
        />

        {(feedType === "userPacks" || feedType === "userTrips") && (
          <Button onPress={handleCreateClick}>Create</Button>
        )}
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
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flexDirection: "column",
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
    padding: 25,
    fontSize: 26,
  },
  dropdown: {
    backgroundColor: "white",
  },
});

export default Feed;
