import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { darkTheme, theme } from '../../theme';
import { Desktop, Mobile, Tablet } from '../../media';
import { Button, HStack } from 'native-base';
import * as Linking from 'expo-linking';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
const AboutContent = ({ desktopContainer, isMobile }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const styles = useCustomStyles(loadStyles);
  console.log('isDark, isLight', isDark, isLight);
  const handleGithubLink = () => {
    // Add the URL of your GitHub repo here
    const githubUrl = 'https://github.com/andrew-bierman/PackRat';
    Linking.openURL(githubUrl);
  };

  /**
   * Handle the Discord link.
   *
   * @param {none} - This function does not take any parameters.
   * @return {none} - This function does not return any value.
   */
  const handleDiscordLink = () => {
    // Add the URL of your Discord server here
    const discordUrl = 'https://discord.gg/jFUuYBTXfY';
    Linking.openURL(discordUrl);
  };

  return (
    <View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={[isDark ? styles.headerDark : styles.header]}>
            About PackRat
          </Text>
        </View>
        <Text style={[isDark ? styles.textDark : styles.text]}>
          Welcome to PackRat, the ultimate adventure planner designed
          specifically for outdoor enthusiasts who have a passion for exploring
          the wonders of the natural world. With our comprehensive app, we aim
          to revolutionize the way you plan and organize your outdoor
          excursions, be it a thrilling weekend camping trip, an invigorating
          day hike, or an epic cross-country road trip. Let us be your trusted
          companion in creating unforgettable adventures and seamless
          experiences in the great outdoors.
        </Text>
        <Text style={[isDark ? styles.textDark : styles.text]}>
          At PackRat, we understand that planning a trip can sometimes be
          overwhelming. That's why our app is built to simplify the process,
          providing you with a user-friendly interface that makes trip planning
          a breeze. Whether you're a seasoned adventurer or a novice explorer,
          our intuitive features ensure that every aspect of your trip is
          carefully considered and effortlessly managed.
        </Text>

        <Text style={[isDark ? styles.textDark : styles.text]}>
          One of the key features of PackRat is its ability to help you create
          and manage trips effortlessly. You can start by creating a
          personalized profile that reflects your interests, preferences, and
          outdoor expertise. By understanding your individual needs, we can
          provide tailored recommendations and suggestions that align with your
          unique adventure style. You can easily create multiple trips, keeping
          all your outdoor escapades neatly organized in one place. From the
          initial concept to the final itinerary, PackRat empowers you to take
          control of your outdoor journeys.
        </Text>

        <Text style={[isDark ? styles.textDark : styles.text]}>
          Discovering new destinations is a thrilling aspect of outdoor
          exploration, and PackRat is your gateway to a world of endless
          possibilities. Our app is equipped with an extensive database of
          breathtaking locations, ranging from serene national parks to hidden
          gems off the beaten path. Explore the rich diversity of landscapes and
          discover new horizons waiting to be explored. Each destination is
          accompanied by detailed information, including descriptions, photos,
          and user reviews, to help you make informed decisions about your next
          adventure.
        </Text>

        <Text style={[isDark ? styles.textDark : styles.text]}>
          But planning a trip isn't just about the destination—it's also about
          being prepared for whatever Mother Nature throws your way. PackRat
          keeps you informed with up-to-date weather forecasts, ensuring that
          you're equipped with the knowledge needed to make well-informed
          decisions about your outdoor activities. From sunny skies to sudden
          rain showers, you'll have the information you need to pack the right
          gear and make the most of your time outdoors.
        </Text>

        <Text style={[isDark ? styles.textDark : styles.text]}>
          To provide you with accurate and reliable navigation, PackRat
          integrates seamlessly with Mapbox, a leading mapping and navigation
          platform. With our app, you'll have access to detailed maps and
          directions to your chosen destinations. We understand that the journey
          is as important as the destination itself, and our navigation features
          are designed to optimize your routes, taking into account factors such
          as traffic, road conditions, and scenic routes. Let PackRat guide you
          on the path to adventure.
        </Text>

        <Text style={[isDark ? styles.textDark : styles.text]}>
          As outdoor enthusiasts ourselves, we know that each season brings a
          unique set of opportunities and challenges. That's why PackRat goes
          beyond just providing directions and weather forecasts. Our app also
          suggests popular outdoor activities based on the location and season
          of your trip. Whether you're looking for the best hiking trails in the
          summer, the most picturesque spots for fall foliage, or the perfect
          skiing destinations in winter, PackRat has got you covered. Let us
          inspire you to try new activities and make the most of each season's
          offerings.
        </Text>

        <Text style={[isDark ? styles.textDark : styles.text]}>
          So, whether you're a solo adventurer seeking solitude in the
          wilderness or a group of friends looking to embark on a shared
          escapade, PackRat is here to help you turn your dreams into reality.
          Pack your bags, grab your friends, and let the thrill of the outdoors
          ignite your spirit of adventure. With PackRat by your side, you can
          confidently navigate the vast landscapes, discover hidden treasures,
          and create lasting memories. Get ready for your next expedition, and
          let PackRat be your trusted companion on the journey of a lifetime.
        </Text>
      </View>
      <View style={desktopContainer}>
        <HStack>
          <View style={styles.buttonContainer}>
            <Button style={styles.githubButton} onPress={handleGithubLink}>
              <HStack>
                <FontAwesome
                  name="github"
                  style={[isDark ? styles.githubIconDark : styles.githubIcon]}
                />
                <Text
                  style={[isDark ? styles.githubTextDark : styles.githubText]}
                >
                  View on GitHub
                </Text>
              </HStack>
            </Button>
            {/* <Button
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
            </Button> */}
          </View>
        </HStack>
      </View>
    </View>
  );
};

export default function About() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return Platform.OS === 'web' ? (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuBar}
    >
      <View style={[isDark ? styles.containerDark : styles.container]}>
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
    </ScrollView>
  ) : (
    <View style={[isDark ? styles.containerDark : styles.container]}>
      <AboutContent desktopContainer={styles.logoContainer} isMobile={true} />
    </View>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    containerDark: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: 10,
    },
    headerDark: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: 10,
    },

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 20,
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
    },

    githubButton: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: theme.colors.primary,
      margin: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor: '#24292E',
    },
    discordButton: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: theme.colors.primary,
      margin: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor: '#7289DA',
    },
    githubIcon: {
      fontSize: 24,
      color: currentTheme.colors.text,
      marginRight: 5,
    },
    githubIconDark: {
      fontSize: 24,
      color: currentTheme.colors.text,
      marginRight: 5,
    },
    githubText: {
      fontSize: 18,
      color: currentTheme.colors.text,
    },
    githubTextDark: {
      fontSize: 18,
      color: currentTheme.colors.text,
    },
    textContainer: {
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 1,
      // fontFamily: "sans-serif",
      color: currentTheme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    textDark: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 1,
      // fontFamily: "sans-serif",
      color: currentTheme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    logoContainer: {
      width: '50%',
      height: 'auto',
    },
    webLogoContainer: {
      width: '25%',
      height: 'auto',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    mobileContainer: {
      width: '50%',
      height: 'auto',
      alignSelf: 'center',
    },
    mobileLogo: {
      width: 160,
      height: 150,
      alignSelf: 'center',
    },
    logo: {
      width: '100%',
      height: 'auto',
      alignSelf: 'center',
    },
  };
};
