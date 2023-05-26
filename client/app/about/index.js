import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { Desktop, Mobile, Tablet } from "../../media";
import { Button, HStack } from "native-base";
import * as Linking from "expo-linking";

const AboutContent = ({ desktopContainer, isMobile }) => {
  const handleGithubLink = () => {
    // Add the URL of your GitHub repo here
    const githubUrl = "https://github.com/andrew-bierman/PackRat";
    Linking.openURL(githubUrl);
  };

  const handleDiscordLink = () => {
    // Add the URL of your Discord server here
    const discordUrl = "https://discord.gg/jFUuYBTXfY";
    Linking.openURL(discordUrl);
  };

  return (
    <View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>About PackRat</Text>
        </View>
        <Text style={styles.text}>
          PackRat is the ultimate adventure planner designed for those who love
          to explore the great outdoors. Our app helps users plan and organize
          their trips with ease, whether it's a weekend camping trip, a day
          hike, or a cross-country road trip. With PackRat, you can create and
          manage trips, discover new destinations, and stay informed with
          up-to-date weather forecasts. Our app integrates with Mapbox to
          provide you with accurate maps and directions to your destinations, as
          well as suggestions for popular outdoor activities based on the
          location and season of your trip. So pack your bags, grab your
          friends, and get ready for your next adventure with PackRat!
        </Text>
      </View>
      <View style={desktopContainer}>
        <HStack>
          <View style={styles.buttonContainer}>
            <Button style={styles.githubButton} onPress={handleGithubLink}>
              <HStack>
                <FontAwesome name="github" style={styles.githubIcon} />
                <Text style={styles.githubText}>View on GitHub</Text>
              </HStack>
            </Button>
            <Button
              style={styles.discordButton}
              // onPress={handleDiscordLink}
            >
              <HStack>
                <MaterialCommunityIcons
                  name="discord"
                  style={styles.githubIcon}
                />
                <Text style={styles.githubText}>Join Us on Discord</Text>
              </HStack>
            </Button>
          </View>
        </HStack>
      </View>
    </View>
  );
};

export default function About() {
  return Platform.OS === "web" ? (
    <View style={styles.container}>
      <Desktop>
        <AboutContent desktopContainer={styles.webLogoContainer} />
      </Desktop>
      <Tablet>
        <AboutContent
          desktopContainer={styles.mobileContainer}
          isMobile={true}
        />
      </Tablet>
      <Mobile>
        <AboutContent
          desktopContainer={styles.mobileContainer}
          isMobile={true}
        />
      </Mobile>
    </View>
  ) : (
    <View style={styles.container}>
      <AboutContent desktopContainer={styles.logoContainer} isMobile={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    marginLeft: Platform.OS === "web" ? 0 : 20,
    marginRight: Platform.OS === "web" ? 0 : 20,
  },
  githubButton: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: theme.colors.primary,
    margin: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: "#24292E",
  },
  discordButton: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: theme.colors.primary,
    margin: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: "#7289DA",
  },
  githubIcon: {
    fontSize: 24,
    color: theme.colors.text,
    marginRight: 5,
  },
  githubText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 1,
    fontFamily: "sans-serif",
    color: theme.colors.text,
    textAlign: "center",
  },
  logoContainer: {
    width: "50%",
    height: "auto",
  },
  webLogoContainer: {
    width: "25%",
    height: "auto",
    alignSelf: "center",
    justifyContent: "center",
  },
  mobileContainer: {
    width: "50%",
    height: "auto",
    alignSelf: "center",
  },
  mobileLogo: {
    width: 160,
    height: 150,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: "auto",
    alignSelf: "center",
  },
});
