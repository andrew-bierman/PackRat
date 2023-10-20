import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, View } from 'react-native';
import {
  Container,
  Button,
  Icon,
  Center,
  Text,
  Card,
  Box,
  VStack,
  HStack,
  ScrollView,
} from 'native-base';
import useTheme from '../../hooks/useTheme';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';
import useCustomStyles from '~/hooks/useCustomStyles';

const dataArray = [
  {
    title: 'Create and manage trips',
    content:
      'Easily create new trips and manage existing ones by adding details such as dates, locations, and activities.',
    iconName: 'directions',
  },
  {
    title: 'Map integration with route planning',
    content:
      'PackRat integrates with OpenStreetMap to provide users with accurate maps and directions to their destinations.',
    iconName: 'map',
  },
  {
    title: 'Activity suggestions',
    content:
      'The app suggests popular outdoor activities based on the location and season of the trip.',
    iconName: 'landscape',
  },
  {
    title: 'Packing list',
    content:
      'Users can create and manage packing lists for their trips to ensure they have everything they need.',
    iconName: 'backpack',
  },
  {
    title: 'Weather forecast',
    content:
      'PackRat provides up-to-date weather forecasts for the trip location to help users prepare accordingly.',
    iconName: 'wb-sunny',
  },
  {
    title: 'Save your hikes and packs, and sync between devices',
    content:
      'User authentication ensures privacy and data security, while enabling you to save and sync your hikes and packs between devices.',
    iconName: 'lock',
  },
];

const CustomAccordion = ({ title, content, iconName }) => {
  const [expanded, setExpanded] = useState(false);
  const styles = useCustomStyles(loadStyles);

  /**
   * Toggles the value of 'expanded' and updates the state.
   *
   * @return {void} No return value
   */
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
            name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
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
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return (
    <ScrollView>
      <Box
        style={{
          alignItems: 'center',
          textAlign: 'center',
          paddingVertical: 10,
          marginTop: Platform.OS !== 'web' ? 15 : 1,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: Platform.OS === 'web' ? currentTheme.font.headerFont : 20,
          }}
        >
          PackRat
        </Text>
        <Text style={{ color: 'white', fontSize: 16 }}>
          The Ultimate Travel App
        </Text>
      </Box>
      <View style={styles.secondaryContentContainer}>
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
          {Platform.OS === 'web' && (
            <View style={styles.appBadges}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button title="App Store" style={{ marginRight: 10 }}>
                  <HStack space={2} alignItems="center">
                    <MaterialCommunityIcons
                      name="apple"
                      size={44}
                      color="white"
                    />
                    <Text style={{ color: 'white' }}>
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
                    <Text style={{ color: 'white' }}>
                      Download on Google Play
                    </Text>
                  </HStack>
                </Button>
              </View>
              <Button title="Web" style={{ marginTop: 10, width: '100%' }}>
                <HStack space={2} alignItems="center">
                  <MaterialCommunityIcons name="web" size={44} color="white" />
                  <Text style={{ color: 'white' }}>Use on Web</Text>
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
      </View>
    </ScrollView>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      flexDirection: 'column',
      height: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'yellow',
    },
    secondaryContentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.colors.background,
    },
    appBadges: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      marginBottom: 20,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    introText: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
      marginBottom: 20,
      color: currentTheme.colors.text,
    },
    card: {
      marginBottom: 10,
      minWidth: '95%',
      alignSelf: 'center',
      backgroundColor: currentTheme.colors.secondaryBlue,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    transparentButton: {
      backgroundColor: 'transparent',
    },
    icon: {
      fontSize: 28,
      color: '#34a89a',
      marginRight: 10,
    },
    featureText: {
      fontSize: 13,
      color: currentTheme.colors.text,
    },
    cardContent: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 13,
      color: currentTheme.colors.text,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    getStartedButton: {
      backgroundColor: '#34a89a',
    },
    footerText: {
      color: currentTheme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
  };
};

export default LandingPage;
