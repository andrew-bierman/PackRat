import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import {
  Container,
  Button,
  Icon,
  Text,
  Card,
  Box,
  VStack,
  HStack,
} from "native-base";
import UseTheme from "../../hooks/useTheme";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";

const dataArray = [
  {
    title: "Create and manage trips",
    content:
      "Easily create new trips and manage existing ones by adding details such as dates, locations, and activities.",
    iconName: "directions",
  },
  {
    title: "Map integration with route planning",
    content:
      "PackRat integrates with OpenStreetMap to provide users with accurate maps and directions to their destinations.",
    iconName: "map",
  },
  {
    title: "Activity suggestions",
    content:
      "The app suggests popular outdoor activities based on the location and season of the trip.",
    iconName: "landscape",
  },
  {
    title: "Packing list",
    content:
      "Users can create and manage packing lists for their trips to ensure they have everything they need.",
    iconName: "backpack",
  },
  {
    title: "Weather forecast",
    content:
      "PackRat provides up-to-date weather forecasts for the trip location to help users prepare accordingly.",
    iconName: "wb-sunny",
  },
  {
    title: "Save your hikes and packs, and sync between devices",
    content:
      "User authentication ensures privacy and data security, while enabling you to save and sync your hikes and packs between devices.",
    iconName: "lock",
  },
];

const CustomAccordion = ({ title, content, iconName }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialIcons name={iconName} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.featureText}>{title}</Text>
        </View>
        <Button
          transparent
          style={styles.transparentButton}
          onPress={toggleExpanded}
        >
          <MaterialIcons
            name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
            style={styles.icon}
          />
        </Button>
      </View>
      {expanded && <Text style={styles.cardContent}>{content}</Text>}
    </Card>
  );
};

const LandingPage = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  return (
    <VStack style={styles.container}>
      <Box
        style={{
          alignItems: "center",
          textAlign: "center",
          paddingVertical: 18,
          marginTop: Platform.OS !== "web" ? 25 : 1,
        }}
      >
        {Platform.OS === "web" ? (
          <Text
            style={{ color: "white", fontSize: currentTheme.font.headerFont }}
          >
            PackRat
          </Text>
        ) : (
          <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
            PackRat
          </Text>
        )}
        <Text style={{ color: "white", fontSize: 18 }}>
          The Ultimate Travel App
        </Text>
      </Box>
      <Box style={styles.secondaryContentContainer}>
        {/* <ImageBackground
          source={require("../../assets/background-image.png")}
          style={styles.backgroundImage}
        > */}
        <View style={styles.overlay} />
        <Container style={styles.contentContainer}>
          <Text style={styles.introText}>
            PackRat is the ultimate adventure planner designed for those who
            love to explore the great outdoors. Plan and organize your trips
            with ease, whether it's a weekend camping trip, a day hike, or a
            cross-country road trip.
          </Text>
          {Platform.OS === "web" && (
            <View style={styles.appBadges}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button title="App Store" style={{ marginRight: 10 }}>
                  <HStack space={2} alignItems="center">
                    <MaterialCommunityIcons
                      name="apple"
                      size={44}
                      color="white"
                    />
                    <Text style={{ color: "white" }}>
                      Download on the App Store
                    </Text>
                  </HStack>
                </Button>
                <Button title="Google Play">
                  <HStack space={2} alignItems="center">
                    <MaterialCommunityIcons
                      name="google-play"
                      size={44}
                      color="white"
                    />
                    <Text style={{ color: "white" }}>
                      Download on Google Play
                    </Text>
                  </HStack>
                </Button>
              </View>
              <Button title="Web" style={{ marginTop: 10, width: "100%" }}>
                <HStack space={2} alignItems="center">
                  <MaterialCommunityIcons name="web" size={44} color="white" />
                  <Text style={{ color: "white" }}>Use on Web</Text>
                </HStack>
              </Button>
            </View>
          )}
          <View>
            {dataArray.map((item, index) => (
              <CustomAccordion
                key={index}
                title={item.title}
                content={item.content}
                iconName={item.iconName}
              />
            ))}
          </View>
        </Container>
        <Container style={styles.buttonContainer}>
          <Button
            full
            style={styles.getStartedButton}
            onPress={() => {
              /* Add navigation to the sign in screen */
            }}
          >
            <Text style={styles.footerText}>Get Started</Text>
          </Button>
        </Container>
        <StatusBar style="auto" />
        {/* </ImageBackground> */}
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
  mutualStyles: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  secondaryContentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  appBadges: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: theme.colors.text,
  },
  card: {
    marginBottom: 10,
    width: "100%",
    backgroundColor: theme.colors.secondaryBlue,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  transparentButton: {
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: 28,
    color: "#34a89a",
    marginRight: 10,
  },
  featureText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.colors.text,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  getStartedButton: {
    backgroundColor: "#34a89a",
  },
  footerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LandingPage;
