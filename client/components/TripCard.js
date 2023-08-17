import { StyleSheet } from "react-native";
import DropdownComponent from "./Dropdown";
import { Box, Text, Stack, View } from "native-base";
import { SearchInput } from "./SearchInput";

import { Platform } from "react-native";

import { theme } from "../theme/index";

import { useSelector, useDispatch } from "react-redux";
import { addTrail, addPark } from "../store/dropdownStore";
import MapContainer from "./map/MapContainer";
import { convertPhotonGeoJsonToShape } from "../utils/mapFunctions";
import { selectAllTrails } from "../store/trailsStore";
import UseTheme from "../hooks/useTheme";
import Carousel from "./carousel";
import { Card, H2, Paragraph } from "tamagui";
export default function TripCard({
  title,
  Icon,
  isMap,
  shape,
  data,
  isSearch,
  isTrail,
  isPark,
}) {
  const dispatch = useDispatch();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();

  const currentTrail = useSelector((state) => state.dropdown.currentTrail);
  const currentPark = useSelector((state) => state.dropdown.currentPark);
  console.log("🚀 ~ file: TripCard.js:34 ~ currentPark:", currentPark)
  const trailsDetails = useSelector(selectAllTrails); // updated selector for new trails slice
  const currentShape = trailsDetails.filter(
    (trail) => trail.properties.name == currentTrail
  );

  const handleValueChange = (value) => {
    console.log("🚀 ~ file: TripCard.js:40 ~ handleValueChange ~ value:", value)
    // Assuming that you have a redux action to set the current trail and park
    if (isTrail) {
      dispatch(addTrail(value));
    } else if (isPark) {
      dispatch(addPark(value));
    }
  };

  return (
    <Stack
      alignSelf="center"
      w={["100%", "100%", "100%", "90%"]}
      direction={["column", "column", "row", "row"]}
      rounded={["none", "none", "md", "lg"]}
      style={
        isSearch
          ? styles().searchContainer
          : isMap
          ? styles().mapCard
          : styles().containerMobile
          ? styles().containerMobile
          : styles().mutualStyles
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
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            fontWeight: 600,
          }}
        >
          {title}
        </Text>
      </Box>
      {isMap ? (
        <MapContainer
          shape={
            shape ??
            (currentShape.length == 0
              ? {}
              : convertPhotonGeoJsonToShape(currentShape[0]))
          }
        />
      ) : isSearch ? (
        <SearchInput />
      ) : (
        // isTrail ?

        
        // <DropdownComponent
        //   {...{
        //     value: currentTrail,
        //     data,
        //     placeholder:"Select Trail",
        //     isTrail,
        //     onValueChange: handleValueChange,
        //     width: 300,
        //   }}
        // />
        // : 
        <View style={{ width : "80%" }} >

        <Carousel iconColor={isDark ? '#fff' : '#000'} itemWidth={150}>
          {
            data && data?.map((item) => {
              let selectedValue = isTrail ? currentTrail : currentPark;
              return(
            <Card
            backgroundColor={item === selectedValue ? theme.colors.background : null}
             onPress={() => handleValueChange(item)} elevate bordered  margin={2}
             >
              <Card.Header padded>
                <Paragraph color={item === selectedValue ? 'white' : 'black'}>{item}</Paragraph>
              </Card.Header>
            </Card>)})
          }
        </Carousel>
         </View>
      )}
    </Stack>
  );
}

const styles = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
  return StyleSheet.create({
    mutualStyles: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      padding: currentTheme.size.cardPadding,
    },
  
    containerMobile: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: "space-between",
      alignItems: "center",
      gap: 25,
      flex: 1,
      paddingHorizontal: 100,
    },
  
    searchContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flex: 1,
      paddingHorizontal: 60,
      paddingVertical: 70,
  
      height: Platform.OS === "web" ? "450px" : "100%",
    },
  
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      // flex: 2,
  
      flexDirection: "column",
      // gap: 45,
      // justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: currentTheme.size.cardPadding,
      paddingHorizontal: currentTheme.padding.paddingInside,
      marginBottom: 20,
      // height: 'fit-content'
      height: Platform.OS === "web" ? "650px" : "100%",
      overflow: "hidden",
    },
  });
} 
