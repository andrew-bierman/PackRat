import { StyleSheet } from "react-native";
import DropdownComponent from "./Dropdown";
import { Box, Text, Stack } from "native-base";
import { SearchInput } from "./SearchInput";

import { Platform } from "react-native";

import { theme } from "../theme/index";

import { useSelector, useDispatch } from "react-redux";
import { addTrail, addPark } from "../store/dropdownStore";
import MapContainer from "./map/MapContainer";

export default function TripCard({
  title,
  Icon,
  isMap,
  data,
  isSearch,
  isTrail,
}) {
  const dispatch = useDispatch();

  const currentTrail = useSelector((state) => state.dropdown.currentTrail);
  const currentPark = useSelector((state) => state.dropdown.currentPark);

  const currentShape = useSelector(
    (state) => state.search.selectedSearchResult
  );

  const handleValueChange = (value) => {
    // Assuming that you have a redux action to set the current trail and park
    if(isTrail) {
      dispatch(addTrail(value));
    } else if (isPark){
      dispatch(addPark(value));
    }
  }

  console.log("currentShape", currentShape);

  return (
    <Stack
      alignSelf="center"
      w={["100%", "100%", "100%", "90%"]}
      direction={["column", "column", "row", "row"]}
      rounded={["none", "none", "md", "lg"]}
      style={
        isSearch
          ? styles.searchContainer
          : isMap
          ? styles.mapCard
          : styles.containerMobile
          ? styles.containerMobile
          : styles.mutualStyles
      }
    >
      <Box
        style={{
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <Icon />
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.font.size,
            fontWeight: 600,
          }}
        >
          {title}
        </Text>
      </Box>
      {isMap ? (
        <MapContainer shape={currentShape} />
      ) : isSearch ? (
        <SearchInput />
      ) : (
        // <Text>Search</Text>
        <DropdownComponent
          {...{
            value: isTrail ? currentTrail : currentPark,
            data,
            placeholder: isTrail ? "Select Trail" : "Select Park",
            isTrail,
            onValueChange: handleValueChange,
            width: 300,
          }}
        />
      )}
    </Stack>
  );
}

const styles = StyleSheet.create({
  mutualStyles: {
    backgroundColor: theme.colors.card,
    flex: 1,
    gap: 45,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: theme.size.cardPadding,
  },

  containerMobile: {
    backgroundColor: theme.colors.card,
    padding: theme.size.mobilePadding,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 25,
    flex: 1,
    paddingHorizontal: 100,
  },

  searchContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.size.mobilePadding,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingHorizontal: 60,
    paddingVertical: 70,

    height: Platform.OS === "web" ? "450px" : "100%",
  },

  mapCard: {
    backgroundColor: theme.colors.card,
    // flex: 2,

    flexDirection: "column",
    // gap: 45,
    // justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: theme.size.cardPadding,
    paddingHorizontal: theme.padding.paddingInside,
    marginBottom: 20,
    // height: 'fit-content'
    height: Platform.OS === "web" ? "650px" : "100%",
    overflow: "hidden",
  },
});
