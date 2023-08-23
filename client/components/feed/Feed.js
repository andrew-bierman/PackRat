import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Text,
  HStack,
  Stack,
  Switch,
  Button,
  Input,
  IconButton,
  Divider,
  Center,
  Flex,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, FlatList, View, Dimensions, Platform, ScrollView } from "react-native";
import Card from "./FeedCard";
import DropdownComponent from "../Dropdown";
import { theme } from "../../theme";
import {
  getPublicPacks,
  getPublicTrips,
  getFavoritePacks,
} from "../../store/feedStore";
import {
  changePackStatus,
  fetchUserPacks,
  selectAllPacks,
} from "../../store/packsStore";
import { fetchUserTrips } from "../../store/tripsStore";
import { useRouter } from "expo-router";
import { fuseSearch } from "../../utils/fuseSearch";
import ScrollButton from "../carousel/ScrollButton";

const { height, width } = Dimensions.get('window')

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

const FeedSearchFilter = ({
  feedType,
  handleSortChange,
  handleTogglePack,
  handleToggleTrip,
  selectedTypes,
  queryString,
  setSearchQuery,
  handleCreateClick,
}) => {
  return (
    <View style={styles.filterContainer}>
      <Box style={styles.searchContainer}>
        <HStack space={3}>
          <Input
            w="80%"
            variant="outline"
            placeholder={`Search ${feedType ? feedType : "Feed"}`}
            onChangeText={setSearchQuery}
          />
          <IconButton
            icon={<AntDesign name="search1" size={24} color="gray" />}
            variant="ghost"
          />
        </HStack>
      </Box>
      <Divider my={3} />
      <Center
        space={3}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={"wrap"}
        padding={2}
        margin={2}
      >
        {feedType === "public" && (
          <HStack space={3} alignItems="center">
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
          </HStack>
        )}
        <HStack space={3} alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            Sort By:
          </Text>
          <DropdownComponent
            value={queryString}
            data={dataValues}
            onValueChange={handleSortChange}
            placeholder="Sort By"
            style={styles.dropdown}
            width={150}
          />
        </HStack>
        {(feedType === "userPacks" || feedType === "userTrips") && (
          <Button onPress={handleCreateClick}>Create</Button>
        )}
      </Center>
      <Divider my={3} />
    </View>
  );
};

const Feed = ({ feedType = "public" }) => {
  const router = useRouter();

  const [queryString, setQueryString] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    pack: true,
    trip: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

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
      if (selectedTypes?.pack) {
        data = [...data, ...publicPacksData];
      }
      if (selectedTypes?.trip) {
        data = [...data, ...publicTripsData];
      }
    } else if (feedType === "userPacks") {
      data = userPacksData;
    } else if (feedType === "userTrips") {
      data = userTripsData;
    } else if (feedType === "favoritePacks") {
      data = userPacksData.filter((pack) => pack.isFavorite);
    }

    // Fuse search
    let keys = ["name", "items.name", "items.category"];
    let options = {
      // your options
      threshold: 0.42,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
    };

    let results = fuseSearch(data, searchQuery, keys, options);

    // Convert fuse results back into the format we want
    // if searchQuery is empty, use the original data
    data = searchQuery ? results.map((result) => result.item) : data;

    // console.log("data", data);

    const scrollViewRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event) => {
      const contentOffset = event.nativeEvent.contentOffset;
      const newIndex = Math.round(contentOffset.x / (Platform.OS === 'web' ? 350 : width * 0.7));
      setCurrentIndex(newIndex);
    };

    const scrollToIndex = (index) => {
      if (index >= 0 && index < data.length && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (index * ((Platform.OS === 'web' ? 350 : width * 0.7))),
          y: 0,
          animated: true,
        });
        setCurrentIndex(index);
      }
    };

    const feedSearchFilterComponent = (
      <FeedSearchFilter
        feedType={feedType}
        handleSortChange={handleSortChange}
        handleTogglePack={handleTogglePack}
        handleToggleTrip={handleToggleTrip}
        selectedTypes={selectedTypes}
        queryString={queryString}
        setSearchQuery={setSearchQuery}
        handleCreateClick={handleCreateClick}
      />
    );
    return (
      <View style={{ flex: 1, paddingBottom: 10, }}>
        {feedSearchFilterComponent}
        <View style={{ marginTop: 20, height: 230, flexDirection: 'row', alignItems: 'center' }} >
          {data?.length === 0 ? <Text style={{ flex: 1, color: 'white', marginLeft: 20, justifyContent: 'center', textAlign: 'center', }}>{ERROR_MESSAGES[feedType]}</Text> : (
            <>
              <View style={{ width: Platform.OS === 'web' ? 50 : width * 0.05, alignItems: 'flex-end' }} >
                <ScrollButton
                  direction={'left'}
                  onPress={() => scrollToIndex(currentIndex - 1)}
                />
              </View>
              <ScrollView
                horizontal
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
              >
                {data?.map((item, index) => {
                  return (
                    <View style={styles.card} key={index}>
                      <Card key={item._id} type={item.type} {...item} />
                    </View>
                  )
                })}
              </ScrollView>

              {/* <FlatList
            ref={scrollViewRef}
            data={data}
            bounces={false}
            numColumns={1}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card} >
                <Card key={item._id} type={item.type} {...item} />
              </View>
            )}
            ListEmptyComponent={() => <Text>{ERROR_MESSAGES[feedType]}</Text>}
            showsVerticalScrollIndicator={false}
          /> */}
              <View style={{ width: Platform.OS === 'web' ? 50 : width * 0.05, alignSelf: 'center' }} >
                <ScrollButton
                  direction={'right'}
                  onPress={() => scrollToIndex(currentIndex + 1)}
                />
              </View>
            </>
          )}
        </View>
      </View>
    )
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

  const urlPath = URL_PATHS[feedType];
  const createUrlPath = URL_PATHS[feedType] + "create";
  const errorText = ERROR_MESSAGES[feedType];

  const handleCreateClick = () => {
    // handle create click logic
    router.push(createUrlPath);
  };

  return <Box style={styles.mainContainer}>{renderData()}</Box>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    fontSize: 18,
    padding: 15,
  },
  filterContainer: {
    backgroundColor: theme.colors.white,
    padding: 15,
    fontSize: 18,
    width: "100%",
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  card: {
    width: Platform.OS === 'web' ? 350 : width * 0.7,
    height: 220,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Feed;
